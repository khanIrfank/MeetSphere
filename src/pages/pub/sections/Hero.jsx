import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { ArrowRight, Video, Users, Sparkles, Mic, ScreenShare, Zap, Download } from 'lucide-react'
import Button from '../../../components/common/Button'
import FloatingBlob from '../../../components/common/FloatingBlob'
import Avatar from '../../../components/common/Avatar'
import AnimatedMeetingVideo from '../../../components/common/AnimatedMeetingVideo'
import { meetingHeroVideo } from '../../../data/images'
import { useAuth } from '../../../context/AuthContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const [meetingId, setMeetingId] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleJoin = (e) => {
    e.preventDefault()
    if (!meetingId.trim()) return
    navigate(isAuthenticated ? '/app/meetings' : '/login')
  }

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden px-4 sm:px-6 lg:px-12">
      <FloatingBlob className="-top-24 -left-24 bg-brand-400/20 dark:bg-brand-500/10" />
      <FloatingBlob className="top-1/2 -right-32 bg-cyan-400/15 dark:bg-cyan-500/10" />

      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <m.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 mb-6 shadow-sm"
          >
            <Sparkles size={14} className="text-brand-500 animate-spin" />
            Next-Gen MeetSphere 2.0 Released
          </m.span>

          <m.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.08] text-theme-heading"
          >
            Meet without{' '}
            <span className="text-brand-500 inline-block">
              limits.
            </span>
          </m.h1>

          <m.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-theme-sub text-base sm:text-lg max-w-lg font-medium"
          >
            MeetSphere combines HD video conferencing, 1-click screen sharing, and real-time in-call chat into one clean, lightning-fast app.
          </m.p>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
          >
            <Button size="lg" to={isAuthenticated ? '/app' : '/register'} icon={ArrowRight} className="font-bold shadow-lg shadow-brand-500/25">
              {isAuthenticated ? 'Go to Dashboard' : 'Start Free Meeting'}
            </Button>
            <Button size="lg" variant="outline" href="#about" className="font-semibold">
              Explore Features
            </Button>
            <Button
              size="lg"
              variant="outline"
              href="https://expo.dev/accounts/irfankhureshi/projects/meetsphere-mobile/builds/b1c31b8f-d834-41e5-8b01-f69189ff37e"
              target="_blank"
              rel="noopener noreferrer"
              icon={Download}
              className="font-bold border-brand-500/40 text-brand-600 dark:text-brand-400 hover:bg-brand-500/10 shadow-sm underline"
            >
              Download APP (MeetSphere.apk)
            </Button>



          </m.div>

          <m.form
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            onSubmit={handleJoin}
            className="mt-9 w-full max-w-md flex items-center gap-2 rounded-2xl border border-soft bg-elevated p-2 shadow-xl"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500 shrink-0 font-bold">
              <Video size={18} />
            </span>
            <input
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              placeholder="Enter meeting ID to join"
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-theme-heading placeholder:text-theme-sub min-w-0 font-medium"
            />
            <Button size="sm" type="submit" className="font-bold">Join</Button>
          </m.form>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-theme-sub font-semibold"
          >
            <div className="flex -space-x-2">
              {['Aisha Khan', 'Rohit Verma', 'Meera Iyer', 'Devansh Rao'].map((n) => (
                <Avatar key={n} name={n} size={28} className="ring-2 ring-[var(--bg)] shadow-sm" />
              ))}
            </div>
            <span className="flex items-center gap-1.5">
              <Users size={15} className="text-brand-500" />
              Over 50,000+ teams meet daily on MeetSphere
            </span>
          </m.div>
        </div>

        {/* Right Column Prominent Video Showcase (7 Cols - Increased Size) */}
        <m.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative w-full"
        >
          <div className="relative rounded-[2.5rem] border-2 border-brand-500/40 bg-elevated p-4 sm:p-5 shadow-2xl shadow-brand-500/15 group">
            {/* Window control dots */}
            <div className="flex items-center justify-between px-3 pb-3 border-b border-soft mb-3">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-500/90 shadow-sm" />
                <span className="h-3.5 w-3.5 rounded-full bg-amber-500/90 shadow-sm" />
                <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/90 shadow-sm" />
              </div>
              <span className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/15 px-3 py-1 rounded-full border border-brand-500/30">
                MeetSphere HD Live Player
              </span>
            </div>

            {/* Large Video Player Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black shadow-2xl">
              <AnimatedMeetingVideo videoSrc={meetingHeroVideo} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Overlay badges on Video */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs text-white font-extrabold tracking-wide">REC • 08:45</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
                <Zap size={14} />
                <span>Ultra Low Latency</span>
              </div>

              {/* Participant Pill overlay bottom left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/20 z-10">
                <Avatar name="Aisha Khan" size={24} />
                <span className="text-xs text-white font-extrabold">Aisha Khan (Host)</span>
                <Mic size={14} className="text-emerald-400 ml-1" />
              </div>
            </div>
          </div>

          {/* Floating animated feature cards */}
          <m.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-16 hidden sm:flex items-center gap-2.5 rounded-2xl border border-soft bg-elevated/95 backdrop-blur-md px-4 py-3 shadow-2xl z-20"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/20 text-brand-500 font-bold">
              <Mic size={18} />
            </span>
            <div>
              <p className="text-xs font-extrabold text-theme-heading">Crystal Clear Audio</p>
              <p className="text-[11px] text-theme-sub font-semibold">AI Noise Cancellation</p>
            </div>
          </m.div>

          <m.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -right-6 bottom-14 hidden sm:flex items-center gap-2.5 rounded-2xl border border-soft bg-elevated/95 backdrop-blur-md px-4 py-3 shadow-2xl z-20"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/20 text-brand-500 font-bold">
              <ScreenShare size={18} />
            </span>
            <div>
              <p className="text-xs font-extrabold text-theme-heading">4K Screen Share</p>
              <p className="text-[11px] text-theme-sub font-semibold">Instant 60FPS Stream</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
