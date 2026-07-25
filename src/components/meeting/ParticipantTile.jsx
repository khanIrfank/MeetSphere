import { useEffect, useRef } from 'react'
import { MicOff } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ParticipantTile({ participant, mediaStream }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && mediaStream && participant.isSelf && participant.camOn) {
      videoRef.current.srcObject = mediaStream
      videoRef.current.play().catch(() => {})
    }
  }, [mediaStream, participant.isSelf, participant.camOn])

  return (
    <div className="relative aspect-video rounded-2xl bg-[#0a1510] border border-white/10 overflow-hidden flex items-center justify-center shadow-lg group">
      {participant.isSelf && mediaStream && participant.camOn ? (
        <video
          ref={(el) => {
            videoRef.current = el
            if (el && mediaStream) {
              el.srcObject = mediaStream
              el.play().catch(() => {})
            }
          }}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover -scale-x-100"
        />
      ) : participant.camOn ? (
        <div className="h-full w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800/20 via-transparent to-transparent" />
          <Avatar name={participant.name} size={64} />
        </div>
      ) : (
        <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center relative">
          <Avatar name={participant.name} size={64} />
        </div>
      )}

      {/* Name tag pill on bottom left of tile */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 z-10">
        {participant.muted && <MicOff size={13} className="text-rose-400" />}
        <span className="text-xs text-white font-medium">
          {participant.isSelf ? `${participant.name} (You)` : participant.name}
        </span>
      </div>
    </div>
  )
}
