import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Globe, Sparkles, CheckCircle2, Video } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { productShots } from '../../../data/images'

const stats = [
  { value: '99.99%', label: 'Uptime Reliability', sub: 'Enterprise Grade SLA' },
  { value: '<40ms', label: 'Ultra-Low Latency', sub: 'Global Edge Network' },
  { value: '10M+', label: 'Monthly Meetings', sub: 'Conducted Worldwide' },
  { value: '150+', label: 'Edge Data Centers', sub: 'Fast Route Anywhere' },
]

const featuresList = [
  'Zero app downloads required — works 100% in all modern browsers',
  'Automatic WebRTC adaptive bitrate video for low bandwidth connections',
  'End-to-end encrypted room sessions with passcode security',
  'Built-in HD Screen Sharing with 60FPS presentation quality',
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-elevated/40 border-y border-soft overflow-hidden select-none">
      <div className="max-w-8xl mx-auto px-5 sm:px-14">
        <Reveal>
          <SectionHeading
            eyebrow="About MeetSphere"
            title="The simplest, fastest way to meet and collaborate online"
            description="We built MeetSphere because traditional meeting tools became bloated, slow, and distracting. MeetSphere is engineered from the ground up for speed, crystal clear audio, and zero friction."
          />
        </Reveal>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-soft bg-elevated p-6 text-center shadow-lg hover:border-brand-500/40 transition-all"
            >
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-600 dark:text-brand-400">
                {item.value}
              </p>
              <p className="text-sm font-extrabold text-theme-heading mt-2">{item.label}</p>
              <p className="text-xs font-semibold text-theme-sub mt-0.5">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Story & Image Showcase Grid */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Story */}
          <Reveal>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-extrabold border border-brand-500/20">
                <Sparkles size={14} />
                <span>Our Core Philosophy</span>
              </span>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-theme-heading leading-tight">
                Designed for teams that value focus over complex menus
              </h3>

              <p className="text-sm sm:text-base font-semibold text-theme-sub leading-relaxed">
                Whether you are holding a quick 1-on-1 sync or presenting to a large team, MeetSphere keeps the focus on your conversation. No mandatory sign-ups for guests, no time limits on core features, and no unnecessary popups.
              </p>

              <div className="space-y-3 pt-2">
                {featuresList.map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-theme-heading">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Image Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-brand-500/30 bg-surface overflow-hidden shadow-2xl group">
              <img
                src={productShots.teamCall}
                alt="MeetSphere Collaboration Team"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-500 text-ink-950 font-bold">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Bank-Grade Security</p>
                    <p className="text-[11px] font-semibold text-slate-300">TLS 1.3 & DTLS WebRTC Protocols</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
