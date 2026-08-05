import { createContext, useContext, useState, useEffect } from 'react'
import { ROOM_PLANS } from '../data/plans'

const PlanContext = createContext()

export function PlanProvider({ children }) {
  // Array of purchased plan IDs
  const [purchasedPlanIds, setPurchasedPlanIds] = useState(() => {
    try {
      const saved = localStorage.getItem('meetsphere_purchased_plans')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Array of billing receipts history
  const [paymentHistory, setPaymentHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('meetsphere_payment_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [billingCycle, setBillingCycle] = useState(() => {
    return localStorage.getItem('meetsphere_billing_cycle') || 'monthly'
  })

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [targetPlanForCheckout, setTargetPlanForCheckout] = useState(null)

  // Sync receipts whenever purchasedPlanIds change so that every active plan has a valid receipt!
  useEffect(() => {
    localStorage.setItem('meetsphere_purchased_plans', JSON.stringify(purchasedPlanIds))

    setPaymentHistory((prevHistory) => {
      let updated = [...prevHistory]
      let changed = false

      purchasedPlanIds.forEach((planId) => {
        const exists = updated.some((rcpt) => rcpt.planId === planId)
        if (!exists) {
          const plan = ROOM_PLANS.find((p) => p.id === planId)
          if (plan) {
            changed = true
            updated.unshift({
              invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
              date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              planId: plan.id,
              planName: plan.name,
              amount: plan.isFree ? '₹0 (Free Plan)' : (billingCycle === 'yearly' ? plan.yearlyPriceDisplay + '/yr' : plan.priceDisplay + '/mo'),
              paymentMethod: plan.isFree ? 'FREE ACTIVATION' : 'UPI',
              status: 'PAID',
              maxHosts: plan.maxHosts,
              maxUsers: plan.maxUsers,
              customerName: 'MeetSphere Host',
            })
          }
        }
      })

      return changed ? updated : prevHistory
    })
  }, [purchasedPlanIds])

  useEffect(() => {
    localStorage.setItem('meetsphere_payment_history', JSON.stringify(paymentHistory))
  }, [paymentHistory])

  useEffect(() => {
    localStorage.setItem('meetsphere_billing_cycle', billingCycle)
  }, [billingCycle])

  // Active plans list owned by the user
  const purchasedPlans = ROOM_PLANS.filter((p) => purchasedPlanIds.includes(p.id))
  const hasActivePlan = purchasedPlans.length > 0

  // Primary active plan (highest capacity plan owned)
  const activePlan = purchasedPlans.length > 0
    ? [...purchasedPlans].sort((a, b) => b.maxUsers - a.maxUsers)[0]
    : null

  const initiateCheckout = (planId) => {
    const plan = ROOM_PLANS.find((p) => p.id === planId)
    if (!plan) return

    // If Free Plan -> Claim instantly without payment checkout!
    if (plan.isFree || plan.monthlyPrice === 0) {
      const freeReceipt = {
        invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        planId: plan.id,
        planName: plan.name,
        amount: '₹0 (Free Plan)',
        paymentMethod: 'FREE ACTIVATION',
        status: 'PAID',
        maxHosts: plan.maxHosts,
        maxUsers: plan.maxUsers,
        customerName: 'MeetSphere Host',
      }
      upgradePlan(plan.id, freeReceipt)
      return
    }

    setTargetPlanForCheckout(plan)
    setCheckoutModalOpen(true)
  }

  // When user purchases/claims a plan, ADD IT to purchased plans instantly
  const upgradePlan = (planId, receiptData = null) => {
    setPurchasedPlanIds((prev) => {
      if (prev.includes(planId)) return prev
      return [...prev, planId]
    })

    if (receiptData) {
      setPaymentHistory((prev) => {
        const filtered = prev.filter((r) => r.invoiceNumber !== receiptData.invoiceNumber)
        return [receiptData, ...filtered]
      })
    }
  }

  // Deactivate / Cancel an active plan
  const cancelPlan = (planId) => {
    setPurchasedPlanIds((prev) => prev.filter((id) => id !== planId))
  }

  const canAccessRoomTier = (requiredPlanId) => {
    if (!hasActivePlan) return false
    return purchasedPlanIds.includes(requiredPlanId)
  }

  return (
    <PlanContext.Provider
      value={{
        activePlan,
        purchasedPlanIds,
        purchasedPlans,
        paymentHistory,
        hasActivePlan,
        billingCycle,
        setBillingCycle,
        checkoutModalOpen,
        setCheckoutModalOpen,
        targetPlanForCheckout,
        initiateCheckout,
        upgradePlan,
        cancelPlan,
        canAccessRoomTier,
        ROOM_PLANS,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider')
  }
  return context
}
