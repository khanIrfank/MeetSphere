import { useState } from 'react'
import { motion as m } from 'framer-motion'
import { Mic, ScreenShare, Zap, Video, PlayCircle } from 'lucide-react'
import Avatar from '../../../components/common/Avatar'
import { meetingHeroVideo, meetingFeatureVideo } from '../../../data/images'

export default function ProductPreview() {
  const [activeVideo, setActiveVideo] = useState('meet')

  const videoSources = {
    meet: {
      title: 'HD Live Meeting Room',
      badge: 'LIVE INTERACTIVE ROOM',
      src: meetingHeroVideo || '/meet.mp4',
      desc: 'Real-time 60FPS HD video conferencing with active speaker visualizer and audio noise cancellation.',
    },
    preview: {
      title: 'Platform & Feature Showcase',
      badge: 'FULL APP OVERVIEW',
      src: meetingFeatureVideo || '/Preview.mp4',
      desc: 'Complete walkthrough of MeetSphere 2.0 features, 1-click invitations, and instant screen sharing.',
    },
  }

  const current = videoSources[activeVideo]

  return (
    <section className="relative py-16 sm:py-24 bg-surface select-none overflow-hidden border-b border-soft">
      {/* Expanded Wide Video Container (max-w-[1400px]) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-black text-brand-600 dark:text-brand-400 mb-4 shadow-xs">
            <Zap size={14} className="text-brand-500" />
            LIVE PRODUCT SHOWCASE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-theme-heading tracking-tight">
            See MeetSphere in Action
          </h2>
          <p className="mt-3 text-theme-sub text-sm sm:text-base font-semibold">
            Switch between live meeting experience and full platform walkthrough below.
          </p>

          {/* Dual Video Selector Tabs */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-elevated border border-soft shadow-lg">
            <button
              onClick={() => setActiveVideo('meet')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeVideo === 'meet'
                  ? 'bg-brand-500 text-ink-950 shadow-md shadow-brand-500/25'
                  : 'text-theme-sub hover:text-theme-heading'
              }`}
            >
              <Video size={16} />
              <span>HD Live Meeting Room (/meet.mp4)</span>
            </button>
            <button
              onClick={() => setActiveVideo('preview')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeVideo === 'preview'
                  ? 'bg-brand-500 text-ink-950 shadow-md shadow-brand-500/25'
                  : 'text-theme-sub hover:text-theme-heading'
              }`}
            >
              <PlayCircle size={16} />
              <span>Platform Feature Video (/Preview.mp4)</span>
            </button>
          </div>
        </div>

        {/* Wide Full-Width Live Video Player Showcase Container */}
        <m.div
          key={activeVideo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2.5rem] border-2 border-brand-500/40 bg-elevated p-4 sm:p-6 shadow-2xl shadow-brand-500/15 w-full"
        >
          {/* Window Control Header */}
          <div className="flex items-center justify-between px-3 pb-3 border-b border-soft mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-rose-500/90 shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-amber-500/90 shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/90 shadow-sm" />
            </div>
            <span className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/15 px-3.5 py-1 rounded-full border border-brand-500/30">
              {current.badge}
            </span>
          </div>

          {/* Wide Large Live Video Player Element */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-black shadow-2xl w-full">
            <video
              key={current.src}
              src={current.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover bg-black"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs text-white font-extrabold tracking-wide">REC • 08:45</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold text-white shadow-lg">
              <Zap size={14} />
              <span>Ultra Low Latency (60FPS)</span>
            </div>

            {/* Participant Pill Overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-black/80 backdrop-blur-md px-4 py-2 border border-white/20 z-10">
              <Avatar name="Aisha Khan" size={26} />
              <span className="text-xs text-white font-extrabold">Aisha Khan (Host)</span>
              <Mic size={14} className="text-emerald-400 ml-1" />
            </div>
          </div>

          {/* Player Description Caption */}
          <div className="mt-4 px-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-theme-sub font-semibold">
            <p className="text-theme-heading font-extrabold">{current.title}: <span className="text-theme-sub font-normal">{current.desc}</span></p>
            <span className="text-brand-500 font-bold shrink-0">Click tabs above to switch videos ⬆</span>
          </div>
        </m.div>
      </div>
    </section>
  )
}
