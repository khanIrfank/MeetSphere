import { useEffect, useRef } from 'react'
import { MicOff } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ParticipantTile({ participant, mediaStream, facingMode = 'user' }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && mediaStream && participant.isSelf && participant.camOn) {
      if (videoRef.current.srcObject !== mediaStream) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play().catch(() => {})
      }
    }
  }, [mediaStream, participant.isSelf, participant.camOn])

  // Mirror front camera ('user'), do not mirror back camera ('environment')
  const isFrontCam = facingMode === 'user'

  return (
    <div className="relative h-full w-full min-h-0 min-w-0 rounded-2xl bg-[#0a1510] border border-white/10 overflow-hidden flex items-center justify-center shadow-lg group">
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
          <Avatar name={participant.name} size={56} />
        </div>
      ) : (
        <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center relative">
          <Avatar name={participant.name} size={56} />
        </div>
      )}

      {/* Name tag pill on bottom left of tile */}
      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 z-10">
        {participant.muted && <MicOff size={13} className="text-rose-400" />}
        <span className="text-[11px] sm:text-xs text-white font-medium truncate max-w-[100px] sm:max-w-none">
          {participant.isSelf ? `${participant.name} (You)` : participant.name}
        </span>
      </div>
    </div>
  )
}
