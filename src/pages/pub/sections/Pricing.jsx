import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { ROOM_PLANS } from '../../../data/plans'
import { usePlan } from '../../../context/PlanContext'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Pricing() {
  const { billingCycle, setBillingCycle, initiateCheckout } = usePlan()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const isYearly = billingCycle === 'yearly'

  const handleSelectPlan = (planId) => {
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
          description="Choose your required room capacity—from 1 Host to 4 Co-Hosts & up to 1,000 live participants."
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

      {/* 4 Room Tiers Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {ROOM_PLANS.map((p, i) => {
          const mainPrice = isYearly ? p.yearlyPriceDisplay : p.priceDisplay
          const periodLabel = isYearly ? p.yearlyPeriod : p.period
          const subtext = isYearly
            ? `Save 20% · (${p.monthlyEquivDisplay}/mo)`
            : 'Billed monthly per host'

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                p.featured
                  ? 'border-brand-500 bg-elevated shadow-xl shadow-brand-500/10 ring-2 ring-brand-500/20'
                  : 'border-soft bg-elevated'
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

              <div>
                <h3 className="font-extrabold text-xl text-theme-heading">{p.name}</h3>
                <p className="text-xs text-theme-sub font-semibold mt-1 mb-5 h-10">{p.tagline}</p>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-theme-heading">{mainPrice}</span>
                    <span className="text-xs text-theme-sub font-semibold">{periodLabel}</span>
                  </div>
                  <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400 mt-0.5">{subtext}</p>
                </div>

                {/* Capacity Badges */}
                <div className="bg-surface/70 border border-soft rounded-2xl p-3 mb-6 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="text-theme-sub">Co-Host Slots:</span>
                    <span className="text-theme-heading">👤 {p.maxHosts} {p.maxHosts === 1 ? 'Host' : 'Hosts'}</span>
                  </div>
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="text-theme-sub">Max Participants:</span>
                    <span className="text-brand-600 dark:text-brand-400">👥 {p.maxUsers.toLocaleString()} Users</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-theme-sub font-medium">
                      <Check size={16} className="text-brand-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(p.id)}
                className={`w-full py-3 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  p.featured
                    ? 'bg-brand-500 hover:bg-brand-400 text-ink-950 shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-surface hover:bg-surface/80 border border-soft text-theme-heading hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <span>Subscribe to {p.name}</span>
                <ArrowRight size={15} />
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}