import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { ArrowRight, Video, Sparkles, Download, ShieldCheck } from 'lucide-react'
import Button from '../../../components/common/Button'
import FloatingBlob from '../../../components/common/FloatingBlob'
import Avatar from '../../../components/common/Avatar'
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
    <section className="hero-section relative pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden border-b border-soft select-none">
      <FloatingBlob className="-top-24 -left-24 bg-cyan-400/15" />
      <FloatingBlob className="top-1/2 -right-32 bg-cyan-500/10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center justify-center">
        {/* Top Badge */}
        {/* <m.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/20 px-4 py-1.5 text-xs font-black text-white mb-6 shadow-sm backdrop-blur-md"
        >
          <Sparkles size={14} className="text-cyan-200 animate-spin" />
          #1 AI-Powered Video Collaboration Platform
        </m.span> */}

        {/* Headline */}
        <m.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-4xl sm:text-5xl font-black leading-[1.08] text-white tracking-tight"
        >
          Secure, Scalable Video Meetings {' '}
          <span className="text-cyan-300 inline-block drop-shadow-md">
            for Every Workspace.
          </span>
        </m.h1>

        {/* Subheadline */}
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-white text-base sm:text-xl max-w-2xl font-semibold leading-relaxed"
        >
          MeetSphere combines HD video conferencing, 1-click screen sharing, and real-time in-call chat into one clean, lightning-fast app.
        </m.p>

        {/* Action Buttons */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5 w-full"
        >
          <Button size="lg" to={isAuthenticated ? '/app' : '/register'} icon={ArrowRight} className="font-bold shadow-xl shadow-cyan-500/30">
            {isAuthenticated ? 'Go to Dashboard' : 'Start Free Meeting'}
          </Button>
          <Button
            size="lg"
            variant="outline"
            href="#about"
            className="font-extrabold text-slate-900 bg-white hover:bg-slate-100 border-0 shadow-lg px-6 py-3 rounded-2xl"
          >
            Explore Features
          </Button>
          <Button
            size="lg"
            variant="outline"
            href="https://github.com/khanIrfank/MeetSphere/releases/download/v1.0.1/MeetSphere.3.apk"
            target="_blank"
            rel="noopener noreferrer"
            icon={Download}
            className="font-extrabold text-slate-900 bg-white hover:bg-slate-100 border-0 shadow-lg px-6 py-3 rounded-2xl"
          >
            Download APP (MeetSphere.apk)
          </Button>
        </m.div>

        {/* Quick Join Input Bar */}
        <m.form
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          onSubmit={handleJoin}
          className="mt-10 w-full max-w-lg flex items-center gap-2 rounded-2xl bg-white p-2.5 shadow-2xl"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 shrink-0">
            <Video size={20} />
          </span>
          <input
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="Enter meeting ID to join instantly"
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 min-w-0 font-bold px-2"
          />
          <Button size="md" type="submit" className="font-bold px-6 shadow-md">Join</Button>
        </m.form>

        {/* Trust Badges */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-cyan-100 font-bold"
        >
          <div className="flex -space-x-2">
            {['Aisha Khan', 'Rohit Verma', 'Meera Iyer', 'Devansh Rao'].map((n) => (
              <Avatar key={n} name={n} size={30} className="ring-2 ring-cyan-900 shadow-sm" />
            ))}
          </div>
          <span className="flex text-white items-center gap-1.5">
            <ShieldCheck size={18} className="text-white" />
            Over 50,000+ teams meet daily on MeetSphere
          </span>
        </m.div>
      </div>
    </section>
  )
}
