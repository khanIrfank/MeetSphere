import { motion } from 'framer-motion'
import { Video, Share2, ShieldCheck, History, CheckCircle2, Sparkles } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { productShots } from '../../../data/images'

const stackingCards = [
  {
    step: '01',
    badge: 'PHASE 01 • INSTANT LAUNCH',
    title: '1-Click HD Video Rooms',
    desc: 'Launch a meeting in under 1 second. No downloads, zero delays, and automatic passcode security for every guest.',
    points: [
      'Instant WebRTC peer-to-peer connection',
      'No guest registration required',
      'Automatic room passcode encryption',
    ],
    img: productShots.callGrid,
    topOffset: 'top-24 sm:top-28',
    zIndex: 'z-10',
  },
  {
    step: '02',
    badge: 'PHASE 02 • 1-CLICK INVITE',
    title: 'Seamless Guest Collaboration',
    desc: 'Share a 1-click link or meeting ID. Invite team members across desktop and mobile effortlessly without app installs.',
    points: [
      'Universal browser support across Desktop & Mobile',
      'Copy invite details with one click',
      'Frictionless guest entry in seconds',
    ],
    img: productShots.laptopCall,
    topOffset: 'top-28 sm:top-32',
    zIndex: 'z-20',
  },
  {
    step: '03',
    badge: 'PHASE 03 • 4K PRESENTATION',
    title: 'Ultra-Low Latency Screen Sharing',
    desc: 'Stream your screen or code editor at 60FPS with 4K clarity, in-call chat, and AI audio noise cancellation.',
    points: [
      'Ultra-low latency audio with AI noise reduction',
      'Smooth 60FPS presentation screen streaming',
      'Real-time in-call text chat & reactions',
    ],
    img: productShots.teamCall,
    topOffset: 'top-32 sm:top-36',
    zIndex: 'z-30',
  },
  {
    step: '04',
    badge: 'PHASE 04 • PERSISTENT LOGS',
    title: 'Automated Calendar & History',
    desc: 'Never lose track of past discussions. Access complete meeting history from your dashboard and rejoin in 1 click.',
    points: [
      'Complete meeting logs with participant counts',
      '1-click rejoin for past sessions',
      'Organized scheduled meeting dashboard',
    ],
    img: productShots.dashboardLog,
    topOffset: 'top-36 sm:top-40',
    zIndex: 'z-40',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 border-y border-soft select-none overflow-visible">
      <div className="max-w-8xl mx-auto px-5 sm:px-14 mb-16">
        <Reveal>
          <SectionHeading
            eyebrow="MW-Style Stacking Vision"
            title="How MeetSphere works in 4 stacked phases"
            description="Scroll down to see each meeting phase stack over the previous card in real-time."
          />
        </Reveal>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative space-y-12 pb-24">
        {stackingCards.map((card) => (
          <div
            key={card.step}
            className={`sticky ${card.topOffset} ${card.zIndex} transition-all duration-500`}
          >
            <div className="rounded-[2.5rem] border border-soft bg-elevated p-6 sm:p-10 shadow-2xl shadow-black/10 dark:shadow-black/50 backdrop-blur-xl overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Text Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/15 border border-brand-500/30 px-3.5 py-1.5 rounded-full">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-theme-heading leading-tight">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-theme-sub leading-relaxed">
                  {card.desc}
                </p>

                <div className="space-y-3 pt-2">
                  {card.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-extrabold text-theme-heading">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column CIRCULAR IMAGE SHOWCASE CARD */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative rounded-full w-64 h-64 sm:w-80 sm:h-80 overflow-hidden border-4 border-brand-500/40 p-2 bg-brand-500/10 shadow-2xl group flex items-center justify-center">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Overlay Badge on Circle */}
                  <div className="absolute bottom-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 z-10 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-brand-400 animate-ping" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">
                      STEP {card.step} STREAM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
