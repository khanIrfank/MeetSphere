import { useEffect, useRef, useState } from 'react'
import { MicOff, Mic, MoreVertical, ShieldCheck } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ParticipantTile({
  participant,
  mediaStream,
  facingMode = 'user',
  isCurrentHost = true,
  onToggleParticipantMic,
  onToggleCoHost,
}) {
  const videoRef = useRef(null)
  const [showHostMenu, setShowHostMenu] = useState(false)

  useEffect(() => {
    if (videoRef.current && mediaStream && participant.isSelf && participant.camOn) {
      if (videoRef.current.srcObject !== mediaStream) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play().catch(() => {})
      }
    }
  }, [mediaStream, participant.isSelf, participant.camOn])

  const isFrontCam = facingMode === 'user'

  return (
    <div className="relative h-full w-full min-h-0 min-w-0 rounded-2xl bg-[#0a1510] border border-white/10 flex items-center justify-center shadow-lg group">
      {/* Inner Video / Avatar Wrapper with overflow-hidden */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
        {participant.isSelf && mediaStream && participant.camOn ? (
          <video
            ref={(el) => {
              videoRef.current = el
              if (el && mediaStream && el.srcObject !== mediaStream) {
                el.srcObject = mediaStream
                el.play().catch(() => {})
              }
            }}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isFrontCam ? '-scale-x-100' : ''}`}
          />
        ) : participant.camOn ? (
          <div className="h-full w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800/20 via-transparent to-transparent" />
            <Avatar name={participant.name} size={48} />
          </div>
        ) : (
          <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center relative">
            <Avatar name={participant.name} size={48} />
          </div>
        )}
      </div>

      {/* Role Badge on Top Left */}
      {(participant.isHost || participant.isCoHost) && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-brand-500/90 text-ink-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md backdrop-blur-sm">
          <ShieldCheck size={11} />
          <span>{participant.isHost ? 'Host' : 'Co-Host'}</span>
        </div>
      )}

      {/* Host Quick Actions Menu Dropdown Trigger (Top Right) - UNCLIPPED UPWARD OVERLAY! */}
      {isCurrentHost && !participant.isSelf && (
        <div className="absolute top-2.5 right-2.5 z-30">
          <button
            onClick={() => setShowHostMenu(!showHostMenu)}
            className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100 shadow-md"
            title="Host Controls for this participant"
          >
            <MoreVertical size={14} />
          </button>

          {showHostMenu && (
            <>
              {/* Invisible backdrop to dismiss menu on click outside */}
              <div className="fixed inset-0 z-40" onClick={() => setShowHostMenu(false)} />
              {/* Dropdown menu opens downwards cleanly inside tile bounds */}
              <div className="absolute right-0 top-9 z-50 bg-[#161a23] text-xs text-white border border-white/20 rounded-2xl p-1.5 w-[136px] shadow-2xl animate-fade-down space-y-0.5">
                <p className="text-[9px] font-extrabold text-brand-400 px-1.5 py-0.5 uppercase tracking-wider truncate border-b border-white/10">
                  {participant.name}
                </p>

                {/* Mute/Unmute Mic (Pins/Unpins user to top!) */}
                <button
                  onClick={() => {
                    onToggleParticipantMic?.(participant.id)
                    setShowHostMenu(false)
                  }}
                  className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-lg hover:bg-white/10 text-left font-semibold text-slate-200 text-[11px] transition-colors"
                >
                  {participant.muted ? <Mic size={13} className="text-emerald-400 shrink-0" /> : <MicOff size={13} className="text-rose-400 shrink-0" />}
                  <span className="truncate">{participant.muted ? 'Unmute Mic' : 'Mute Mic'}</span>
                </button>

                {/* Make / Remove Co-Host */}
                <button
                  onClick={() => {
                    onToggleCoHost?.(participant.id)
                    setShowHostMenu(false)
                  }}
                  className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-lg hover:bg-white/10 text-left font-semibold text-brand-400 text-[11px] transition-colors border-t border-white/10 pt-1 mt-0.5"
                >
                  <ShieldCheck size={13} className="shrink-0" />
                  <span className="truncate">{participant.isCoHost ? 'Remove' : 'Make Co-Host'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Name tag pill on bottom left of tile */}
      <div className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] flex items-center gap-1 rounded-lg bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/10 z-10 overflow-hidden">
        {participant.muted && <MicOff size={11} className="text-rose-400 shrink-0" />}
        <span className="text-[10px] sm:text-[11px] text-white font-medium truncate min-w-0">
          {participant.isSelf ? `${participant.name} (You)` : participant.name}
        </span>
      </div>
    </div>
  )
}
