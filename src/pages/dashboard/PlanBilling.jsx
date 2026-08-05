import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight, Lock, AlertCircle, PlusCircle, CheckCircle2, Trash2, Power } from 'lucide-react'
import { usePlan } from '../../context/PlanContext'
import DeactivatePlanModal from '../../components/modals/DeactivatePlanModal'

export default function PlanBilling() {
  const { activePlan, purchasedPlanIds, purchasedPlans, hasActivePlan, initiateCheckout, cancelPlan, billingCycle, setBillingCycle, ROOM_PLANS } = usePlan()
  const [searchParams] = useSearchParams()

  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const [planToDeactivate, setPlanToDeactivate] = useState(null)

  const isRedirectFromHome = searchParams.get('subscribe') === 'required'
  const isYearly = billingCycle === 'yearly'

  const handleOpenDeactivateModal = (plan) => {
    setPlanToDeactivate(plan)
    setDeactivateModalOpen(true)
  }

  const handleConfirmDeactivate = (planId) => {
    cancelPlan(planId)
    setPlanToDeactivate(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 select-none">
      {/* Redirect Alert Banner */}
      {isRedirectFromHome && !hasActivePlan && (
        <div className="rounded-2xl bg-amber-500/15 border border-amber-500/40 p-4 flex items-center gap-3 text-xs shadow-md animate-fade-up">
          <AlertCircle size={22} className="text-amber-400 shrink-0" />
          <div>
            <p className="font-extrabold text-amber-300 text-sm">Active Room Subscription Required!</p>
            <p className="text-slate-300 font-medium mt-0.5">
              To start or schedule live meetings, please select and subscribe to at least one Room Plan below.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-theme-heading">
            Room Plans & Subscriptions
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-theme-sub mt-1">
            Purchase, manage, or deactivate your active meeting room host capacities.
          </p>
        </div>

        {/* Monthly / Yearly Billing Toggle */}
        <div className="flex items-center gap-2 bg-elevated border border-soft p-1.5 rounded-2xl shrink-0 self-start sm:self-auto shadow-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              !isYearly ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold' : 'text-theme-sub hover:text-theme-heading'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              isYearly ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold' : 'text-theme-sub hover:text-theme-heading'
            }`}
          >
            <span>Yearly</span>
            <span className="text-[9px] bg-ink-950 text-brand-400 font-extrabold px-1.5 py-0.2 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Active Subscriptions Summary Banner */}
      <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-500/15 via-elevated to-surface p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold text-xs border ${
            hasActivePlan
              ? 'bg-brand-500/20 text-brand-600 dark:text-brand-400 border-brand-500/30'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }`}>
            <Zap size={14} /> {hasActivePlan ? `Active Subscriptions (${purchasedPlans.length})` : 'No Active Subscription'}
          </span>
        </div>

        {hasActivePlan ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
            {purchasedPlans.map((plan) => (
              <div key={plan.id} className="bg-surface/80 border border-brand-500/40 p-4 rounded-2xl shadow-sm space-y-3 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-base text-theme-heading">{plan.name}</p>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-ink-950">
                      <CheckCircle2 size={13} />
                    </span>
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-extrabold mt-1">
                    👤 {plan.maxHosts} {plan.maxHosts === 1 ? 'Host' : 'Hosts'} · 👥 {plan.maxUsers.toLocaleString()} Users
                  </p>
                  <p className="text-[11px] text-theme-sub font-semibold mt-0.5">
                    Status: <span className="text-emerald-400 font-bold">Active</span> ({plan.isFree ? 'Free Plan' : (isYearly ? plan.yearlyPriceDisplay + '/yr' : plan.priceDisplay + '/mo')})
                  </p>
                </div>

                <button
                  onClick={() => handleOpenDeactivateModal(plan)}
                  className="w-full py-1.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-white font-extrabold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Power size={13} />
                  <span>Deactivate Plan</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-left">
            <h2 className="font-display text-xl font-extrabold text-theme-heading">No Active Plan Subscribed</h2>
            <p className="text-xs text-theme-sub font-semibold mt-1">
              Select one or more room plans below to unlock host meeting features.
            </p>
          </div>
        )}
      </div>

      {/* Room Tiers Comparison Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-extrabold text-theme-heading">Available Room Tiers</h3>
          <p className="text-xs font-semibold text-theme-sub">You can subscribe to multiple room plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ROOM_PLANS.map((p) => {
            const isSubscribed = purchasedPlanIds.includes(p.id)
            const price = p.isFree ? '₹0' : (isYearly ? p.yearlyPriceDisplay : p.priceDisplay)
            const period = p.isFree ? 'forever free' : (isYearly ? p.yearlyPeriod : p.period)

            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-5 border flex flex-col justify-between transition-all ${
                  isSubscribed
                    ? 'border-brand-500 bg-elevated shadow-xl shadow-brand-500/10 ring-2 ring-brand-500/30'
                    : 'border-soft bg-elevated hover:border-brand-500/40'
                }`}
              >
                {p.featured && !isSubscribed && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 text-ink-950 text-[10px] font-extrabold px-3 py-0.5 shadow">
                    Most Popular
                  </span>
                )}

                {isSubscribed && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 text-ink-950 text-[10px] font-extrabold px-3 py-0.5 shadow">
                    Subscribed & Active
                  </span>
                )}

                <div>
                  <h4 className="font-extrabold text-base text-theme-heading">{p.name}</h4>
                  <p className="text-[11px] text-theme-sub font-semibold mt-1 mb-4 h-10 leading-tight">{p.tagline}</p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-extrabold text-theme-heading">{price}</span>
                      <span className="text-[10px] text-theme-sub font-semibold">{period}</span>
                    </div>
                    {isYearly && !p.isFree && (
                      <p className="text-[10px] text-brand-600 dark:text-brand-400 font-bold mt-0.5">
                        Save 20% · ({p.monthlyEquivDisplay}/mo)
                      </p>
                    )}
                  </div>

                  {/* Room Limits Pill */}
                  <div className="bg-surface/70 border border-soft rounded-xl p-2.5 mb-4 space-y-1 text-[11px]">
                    <div className="flex justify-between font-bold">
                      <span className="text-theme-sub">Hosts:</span>
                      <span className="text-theme-heading">{p.maxHosts} {p.maxHosts === 1 ? 'Host' : 'Hosts'}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-theme-sub">Participants:</span>
                      <span className="text-brand-600 dark:text-brand-400">{p.maxUsers.toLocaleString()} Users</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[11px] text-theme-body font-medium">
                        <Check size={14} className="text-brand-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isSubscribed ? (
                  <button
                    onClick={() => handleOpenDeactivateModal(p)}
                    className="w-full py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-white font-extrabold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Power size={13} />
                    <span>Deactivate Plan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => initiateCheckout(p.id)}
                    className="w-full py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {p.isFree ? 'Claim Free Plan' : `Subscribe to ${p.name}`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Deactivate Plan Warning Confirmation Modal */}
      <DeactivatePlanModal
        open={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        planToDeactivate={planToDeactivate}
        onConfirmDeactivate={handleConfirmDeactivate}
      />
    </div>
  )
}
