import { createContext, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ROOM_PLANS } from '../data/plans'
import {
  setBillingCycle,
  setCheckoutModalOpen,
  initiateCheckoutAction,
  upgradePlanAction,
  cancelPlanAction,
  syncMissingReceipts,
} from '../redux/slices/planSlice'

const PlanContext = createContext()

export function PlanProvider({ children }) {
  const dispatch = useDispatch()
  const planState = useSelector((state) => state.plan || {})
  const purchasedPlanIds = planState.purchasedPlanIds || []
  const paymentHistory = planState.paymentHistory || []
  const billingCycle = planState.billingCycle || 'monthly'
  const checkoutModalOpen = planState.checkoutModalOpen || false
  const targetPlanForCheckout = planState.targetPlanForCheckout || null

  useEffect(() => {
    dispatch(syncMissingReceipts())
  }, [purchasedPlanIds, dispatch])

  const purchasedPlans = ROOM_PLANS.filter((p) => purchasedPlanIds.includes(p.id))
  const hasActivePlan = purchasedPlans.length > 0

  const activePlan = purchasedPlans.length > 0
    ? [...purchasedPlans].sort((a, b) => b.maxUsers - a.maxUsers)[0]
    : null

  const initiateCheckout = (planId) => {
    const plan = ROOM_PLANS.find((p) => p.id === planId)
    if (!plan) return

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
      dispatch(upgradePlanAction({ planId: plan.id, receiptData: freeReceipt }))
      return
    }

    dispatch(initiateCheckoutAction(planId))
  }

  const upgradePlan = (planId, receiptData = null) => {
    dispatch(upgradePlanAction({ planId, receiptData }))
  }

  const cancelPlan = (planId) => {
    dispatch(cancelPlanAction(planId))
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
        setBillingCycle: (cycle) => dispatch(setBillingCycle(cycle)),
        checkoutModalOpen,
        setCheckoutModalOpen: (open) => dispatch(setCheckoutModalOpen(open)),
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
