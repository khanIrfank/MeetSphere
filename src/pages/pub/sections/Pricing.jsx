import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { ROOM_PLANS } from '../../../data/plans'
import { usePlan } from '../../../context/PlanContext'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Pricing() {
  const { billingCycle, setBillingCycle, initiateCheckout, purchasedPlanIds } = usePlan()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const isYearly = billingCycle === 'yearly'

  const handleSelectPlan = (planId, isFree) => {
    if (isAuthenticated) {
      initiateCheckout(planId)
    } else {
      navigate(`/register?plan=${planId}`)
    }
  }

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 select-none">
      <Reveal>
        <SectionHeading
          eyebrow="Room Pricing Tiers"
          title="Meeting Rooms Built to Scale with Your Team"
          description="Start Forever Free or choose your required room capacity—from 1 Host to 4 Co-Hosts & up to 1,000 live participants."
        />
      </Reveal>

      {/* Monthly / Yearly Billing Cycle Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 bg-elevated border border-soft p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              !isYearly ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold' : 'text-theme-sub hover:text-theme-heading'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              isYearly ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold' : 'text-theme-sub hover:text-theme-heading'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[9px] bg-ink-950 text-brand-400 font-extrabold px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 5 Room Tiers Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
        {ROOM_PLANS.map((p, i) => {
          const isSubscribed = purchasedPlanIds.includes(p.id)
          const mainPrice = p.isFree ? '₹0' : (isYearly ? p.yearlyPriceDisplay : p.priceDisplay)
          const periodLabel = p.isFree ? 'forever free' : (isYearly ? p.yearlyPeriod : p.period)
          const subtext = p.isFree
            ? 'No credit card required'
            : (isYearly ? `Save 20% · (${p.monthlyEquivDisplay}/mo)` : 'Billed monthly per host')

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all ${
                p.featured
                  ? 'border-brand-500 bg-elevated shadow-xl shadow-brand-500/10 ring-2 ring-brand-500/20'
                  : (p.isFree ? 'border-emerald-500/40 bg-elevated' : 'border-soft bg-elevated')
              }`}
            >
              {p.featured && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 text-ink-950 text-[10px] font-extrabold px-3 py-0.5 shadow-md"
                >
                  {p.badge}
                </motion.span>
              )}

              {p.isFree && !p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 text-ink-950 text-[10px] font-extrabold px-3 py-0.5 shadow-md">
                  Free Plan
                </span>
              )}

              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-theme-heading">{p.name}</h3>
                <p className="text-[11px] sm:text-xs text-theme-sub font-semibold mt-1 mb-4 h-10 leading-tight">{p.tagline}</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-theme-heading">{mainPrice}</span>
                    <span className="text-[11px] text-theme-sub font-semibold">{periodLabel}</span>
                  </div>
                  <p className="text-[10px] font-bold text-brand-600 dark:text-brand-400 mt-0.5">{subtext}</p>
                </div>

                {/* Capacity Badges */}
                <div className="bg-surface/70 border border-soft rounded-2xl p-2.5 mb-5 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="text-theme-sub">Co-Host Slots:</span>
                    <span className="text-theme-heading">👤 {p.maxHosts} {p.maxHosts === 1 ? 'Host' : 'Hosts'}</span>
                  </div>
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="text-theme-sub">Max Participants:</span>
                    <span className="text-brand-600 dark:text-brand-400">👥 {p.maxUsers.toLocaleString()} Users</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[11px] sm:text-xs text-theme-sub font-medium">
                      <Check size={15} className="text-brand-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => !isSubscribed && handleSelectPlan(p.id, p.isFree)}
                disabled={isSubscribed}
                className={`w-full py-2.5 rounded-2xl font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSubscribed
                    ? 'bg-surface border border-soft text-emerald-400 cursor-default opacity-90'
                    : (p.featured
                        ? 'bg-brand-500 hover:bg-brand-400 text-ink-950 shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98]'
                        : (p.isFree
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-ink-950 shadow-emerald-500/20 hover:scale-[1.02]'
                            : 'bg-surface hover:bg-surface/80 border border-soft text-theme-heading hover:scale-[1.02]'
                          )
                      )
                }`}
              >
                <span>{isSubscribed ? 'Active Plan' : (p.isFree ? 'Get Started Free' : `Subscribe to ${p.name}`)}</span>
                {!isSubscribed && <ArrowRight size={14} />}
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}