import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../../../components/common/Button'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'

const plans = [
  {
    name: 'Basic',
    price: '₹0',
    period: 'forever',
    desc: 'For quick catch-ups and personal use.',
    features: ['40-minute group meetings', 'Unlimited 1:1 meetings', 'In-meeting chat', 'Screen sharing'],
    featured: false,
  },
  {
    name: 'Pro',
    price: '₹799',
    period: '/ host / month',
    desc: 'For small teams that meet often.',
    features: ['30-hour group meetings', 'Meeting scheduling', 'In-meeting chat + history', 'Screen sharing', 'Priority support'],
    featured: true,
  },
  {
    name: 'Business',
    price: '₹1,499',
    period: '/ host / month',
    desc: 'For growing teams and departments.',
    features: ['Everything in Pro', 'Up to 300 participants', 'Admin controls', 'Dedicated onboarding'],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with your team"
          description="Start free. Upgrade only when your meetings need more room."
        />
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-6 items-start">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className={`relative rounded-3xl p-8 border ${
              p.featured
                ? 'border-brand-500 bg-elevated md:-translate-y-3 shadow-[0_0_0_1px_rgba(20,181,109,0.3)]'
                : 'border-soft bg-elevated'
            }`}
          >
            {p.featured && (
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 text-ink-950 text-xs font-semibold px-3 py-1"
              >
                Most popular
              </motion.span>
            )}
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-muted mt-1 mb-6">{p.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-semibold">{p.price}</span>
              <span className="text-sm text-muted">{p.period}</span>
            </div>
            <Button to="/register" variant={p.featured ? 'primary' : 'outline'} className="w-full mb-7">
              Get started
            </Button>
            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <Check size={16} className="text-brand-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}