import { useState } from 'react'
import { X, Mic, MicOff, Video, VideoOff, UserPlus, Copy, Check } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ParticipantsModal({ open, onClose, participants = [], meetingId = '849 2039 1042' }) {
  const [copied, setCopied] = useState(false)
  const [mutedAll, setMutedAll] = useState(false)

  if (!open) return null

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText(`Join MeetSphere Meeting ID: ${meetingId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-md bg-[#1a1a20] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#141418]">
          <h3 className="text-sm font-semibold text-slate-100">
            Participants ({participants.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Participants list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-white/5 scrollbar-thin">
          {participants.map((p) => (
            <div key={p.id} className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={p.name} size={36} />
                <div>
                  <p className="text-xs font-semibold text-slate-100">
                    {p.name} {p.isSelf && <span className="text-slate-400 font-normal">(Me, Host)</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                {mutedAll || p.muted ? (
                  <MicOff size={16} className="text-rose-400" />
                ) : (
                  <Mic size={16} className="text-emerald-400" />
                )}
                {p.camOn ? (
                  <Video size={16} className="text-emerald-400" />
                ) : (
                  <VideoOff size={16} className="text-slate-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-white/10 bg-[#141418] flex items-center justify-between gap-2">
          <button
            onClick={handleCopyInvite}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#26262d] hover:bg-white/10 text-xs font-medium text-slate-200 rounded-xl transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <UserPlus size={14} />}
            <span>{copied ? 'Copied Link' : 'Invite'}</span>
          </button>

          <button
            onClick={() => setMutedAll(!mutedAll)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              mutedAll
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            {mutedAll ? 'Unmute All' : 'Mute All'}
          </button>
        </div>
      </div>
    </div>
  )
}
