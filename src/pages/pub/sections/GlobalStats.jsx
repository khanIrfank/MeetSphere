import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe2, Users2, Video, Star, Zap, TrendingUp } from 'lucide-react'
import Reveal from '../../../components/common/Reveal'

// Animated counter hook
function useCountUp(target, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(startOnMount)

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, start: () => setStarted(true) }
}

const stats = [
  {
    icon: Users2,
    targetVal: 50000,
    suffix: '+',
    label: 'Active Teams',
    description: 'across 90+ countries',
    color: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Video,
    targetVal: 2000000,
    suffix: '+',
    label: 'Meetings Hosted',
    description: 'every single month',
    color: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
  },
  {
    icon: Star,
    targetVal: 4.9,
    suffix: '/5',
    label: 'Average Rating',
    description: 'from 12,000+ reviews',
    color: 'from-amber-400 to-orange-400',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    isFloat: true,
  },
  {
    icon: Zap,
    targetVal: 99.9,
    suffix: '%',
    label: 'Uptime SLA',
    description: 'guaranteed reliability',
    color: 'from-emerald-400 to-teal-400',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    isFloat: true,
  },
]

function StatCard({ stat, index }) {
  const { icon: Icon, targetVal, suffix, label, description, iconBg, iconColor, isFloat } = stat
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [displayVal, setDisplayVal] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const duration = 1800
    const steps = 60
    const stepDuration = duration / steps
    let current = 0
    const increment = targetVal / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= targetVal) {
        setDisplayVal(targetVal)
        clearInterval(timer)
      } else {
        setDisplayVal(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [visible, targetVal, isFloat])

  const formatted = isFloat
    ? displayVal.toFixed(1)
    : displayVal >= 1000000
      ? (displayVal / 1000000).toFixed(1) + 'M'
      : displayVal >= 1000
        ? (displayVal / 1000).toFixed(0) + 'K'
        : displayVal.toLocaleString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-3xl border border-soft bg-elevated p-7 sm:p-8 overflow-hidden hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500"
    >
      {/* Glow bg on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(6,182,212,0.06), transparent 70%)' }} />

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${iconBg} mb-5`}>
        <Icon size={24} className={iconColor} strokeWidth={2} />
      </div>

      {/* Counter */}
      <div className="flex items-end gap-1 mb-1">
        <span className="font-display text-4xl sm:text-5xl font-black text-theme-heading leading-none tracking-tight">
          {formatted}
        </span>
        <span className="font-display text-2xl sm:text-3xl font-black text-brand-500 leading-none mb-0.5">
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-base font-extrabold text-theme-heading mt-2">{label}</p>
      <p className="text-sm font-semibold text-theme-sub mt-0.5">{description}</p>

      {/* Trend indicator */}
      <div className="flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-400">
        <TrendingUp size={13} />
        <span>Growing every month</span>
      </div>
    </motion.div>
  )
}

// Trusted brand logos (text-based, no external images)
const trustedBrands = [
  'TechScale', 'DesignCraft', 'GlobalFlow', 'NexusLabs',
  'CloudPeak', 'StartupHub', 'InnovateCo', 'DataBridge',
]

export default function GlobalStats() {
  return (
    <section className="py-24 sm:py-32 border-t border-soft relative overflow-hidden select-none">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-black text-brand-400 mb-5">
              <Globe2 size={13} />
              Trusted Worldwide
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-theme-heading leading-tight tracking-tight">
              Numbers that speak{' '}
              <span className="text-brand-500">for themselves</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg font-semibold text-theme-sub leading-relaxed max-w-xl mx-auto">
              From startups to enterprises, MeetSphere powers real collaboration for teams around the world.
            </p>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Trusted By Marquee */}
        <Reveal>
          <div className="mt-20">
            <p className="text-center text-xs font-bold text-theme-sub uppercase tracking-widest mb-8">
              Trusted by teams at
            </p>
            <div className="flex overflow-hidden space-x-0 group">
              <div className="flex shrink-0 gap-10 animate-marquee group-hover:[animation-play-state:paused]">
                {[...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands].map((brand, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-soft bg-elevated hover:border-brand-500/40 hover:bg-brand-500/5 transition-all duration-300 cursor-default shrink-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-500 opacity-60" />
                    <span className="text-sm font-extrabold text-theme-sub hover:text-brand-500 transition-colors whitespace-nowrap">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
