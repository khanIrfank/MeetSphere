import { createSlice } from '@reduxjs/toolkit'
import { ROOM_PLANS } from '../../data/plans'

const getSavedPurchasedPlans = () => {
  try {
    const saved = localStorage.getItem('meetsphere_purchased_plans')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const getSavedPaymentHistory = () => {
  try {
    const saved = localStorage.getItem('meetsphere_payment_history')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const getSavedBillingCycle = () => {
  return localStorage.getItem('meetsphere_billing_cycle') || 'monthly'
}

const initialState = {
  purchasedPlanIds: getSavedPurchasedPlans(),
  paymentHistory: getSavedPaymentHistory(),
  billingCycle: getSavedBillingCycle(),
  checkoutModalOpen: false,
  targetPlanForCheckout: null,
}

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setBillingCycle: (state, action) => {
      state.billingCycle = action.payload
      localStorage.setItem('meetsphere_billing_cycle', action.payload)
    },
    setCheckoutModalOpen: (state, action) => {
      state.checkoutModalOpen = action.payload
    },
    setTargetPlanForCheckout: (state, action) => {
      state.targetPlanForCheckout = action.payload
    },
    initiateCheckoutAction: (state, action) => {
      const plan = ROOM_PLANS.find((p) => p.id === action.payload)
      if (!plan) return
      state.targetPlanForCheckout = plan
      state.checkoutModalOpen = true
    },
    upgradePlanAction: (state, action) => {
      const { planId, receiptData } = action.payload
      if (!state.purchasedPlanIds.includes(planId)) {
        state.purchasedPlanIds.push(planId)
        localStorage.setItem('meetsphere_purchased_plans', JSON.stringify(state.purchasedPlanIds))
      }
      if (receiptData) {
        state.paymentHistory = [receiptData, ...state.paymentHistory.filter((r) => r.invoiceNumber !== receiptData.invoiceNumber)]
        localStorage.setItem('meetsphere_payment_history', JSON.stringify(state.paymentHistory))
      }
    },
    cancelPlanAction: (state, action) => {
      state.purchasedPlanIds = state.purchasedPlanIds.filter((id) => id !== action.payload)
      localStorage.setItem('meetsphere_purchased_plans', JSON.stringify(state.purchasedPlanIds))
    },
    syncMissingReceipts: (state) => {
      let updated = [...state.paymentHistory]
      let changed = false

      state.purchasedPlanIds.forEach((planId) => {
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
              amount: plan.isFree ? '₹0 (Free Plan)' : (state.billingCycle === 'yearly' ? plan.yearlyPriceDisplay + '/yr' : plan.priceDisplay + '/mo'),
              paymentMethod: plan.isFree ? 'FREE ACTIVATION' : 'UPI',
              status: 'PAID',
              maxHosts: plan.maxHosts,
              maxUsers: plan.maxUsers,
              customerName: 'MeetSphere Host',
            })
          }
        }
      })

      if (changed) {
        state.paymentHistory = updated
        localStorage.setItem('meetsphere_payment_history', JSON.stringify(updated))
      }
    },
  },
})

export const {
  setBillingCycle,
  setCheckoutModalOpen,
  setTargetPlanForCheckout,
  initiateCheckoutAction,
  upgradePlanAction,
  cancelPlanAction,
  syncMissingReceipts,
} = planSlice.actions

export default planSlice.reducer
