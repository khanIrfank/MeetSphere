import { useState, useEffect } from 'react'
import { Mic, Video, ScreenShare, Sparkles, MessageSquare, Volume2 } from 'lucide-react'

export default function AnimatedMeetingVideo({ videoSrc }) {
  const [videoError, setVideoError] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const participants = [
    { name: 'Aisha Khan (Host)', avatar: 'AK', role: 'Engineering Lead', bg: 'bg-emerald-950/80', border: 'border-emerald-500' },
    { name: 'Rohit Verma', avatar: 'RV', role: 'Product Manager', bg: 'bg-slate-900', border: 'border-slate-700' },
    { name: 'Meera Iyer', avatar: 'MI', role: 'UI/UX Designer', bg: 'bg-teal-950', border: 'border-teal-600' },
    { name: 'Devansh Rao', avatar: 'DR', role: 'DevOps Specialist', bg: 'bg-zinc-900', border: 'border-zinc-700' },
  ]

  if (videoSrc && !videoError) {
    return (
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setVideoError(true)}
        className="w-full h-full object-contain bg-black"
      />
    )
  }

  return (
    <div className="w-full h-full bg-[#081710] p-3 grid grid-cols-2 gap-2 relative overflow-hidden select-none">
      {/* Dynamic Participant Tiles Grid */}
      {participants.map((p, idx) => {
        const isSpeaking = activeSpeaker === idx
        return (
          <div
            key={p.name}
            className={`relative rounded-xl border ${
              isSpeaking ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-white/10'
            } ${p.bg} flex flex-col items-center justify-center p-3 transition-all duration-500 overflow-hidden group/tile`}
          >
            {/* Animated Avatar / Camera Feed */}
            <div className="relative mb-2">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center font-extrabold text-sm text-ink-950 bg-gradient-to-tr from-brand-500 to-brand-300 shadow-md ${
                  isSpeaking ? 'scale-110 transition-transform' : ''
                }`}
              >
                {p.avatar}
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-ink-950 animate-ping" />
              )}
            </div>

            {/* Name pill */}
            <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
              <span className="text-[10px] font-extrabold text-white truncate max-w-[100px]">{p.name}</span>
              <Mic size={10} className={isSpeaking ? 'text-brand-400 animate-pulse' : 'text-slate-500'} />
            </div>

            {/* Audio Wave Visualizer for Speaking Participant */}
            {isSpeaking && (
              <div className="absolute bottom-2 left-2 flex items-center gap-0.5">
                <span className="h-2 w-0.5 bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-3.5 w-0.5 bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-0.5 bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
