import { useState } from 'react'
import { X, Mic, MicOff, Video, VideoOff, Search, ShieldCheck, PhoneCall, Copy, Check, Users } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ParticipantsModal({
  open,
  onClose,
  participants = [],
  meetingId = '849 2039 1042',
  maxHostsLimit = 3,
  onToggleParticipantMic,
  onToggleParticipantCam,
  onToggleCoHost,
  onStartPrivateCall,
  onMuteAll,
}) {
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  if (!open) return null

  // Filter 500+ participants by search input
  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCoHostsCount = participants.filter((p) => p.isCoHost || p.isHost).length

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText(`Join MeetSphere Meeting ID: ${meetingId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-fade-up select-none">
      <div className="w-full max-w-lg bg-[#14161f] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1a1d28]">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <Users size={18} className="text-brand-400" />
              <span>Participants ({participants.length.toLocaleString()})</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Co-Host Slots: <span className="text-brand-400 font-bold">{activeCoHostsCount} / {maxHostsLimit} Allocated</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar for 500+ Participants */}
        <div className="p-3 border-b border-white/10 bg-[#12141c]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/40 border border-white/15 text-xs">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search 500+ participants by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 font-medium"
            />
          </div>
        </div>

        {/* Participants list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-white/5 scrollbar-thin">
          {filteredParticipants.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 font-medium">
              No participants found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredParticipants.map((p) => (
              <div key={p.id} className="pt-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={p.name} size={38} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-extrabold text-white truncate">{p.name}</p>
                      {p.isSelf && <span className="text-[10px] text-slate-400 font-bold">(You)</span>}
                      {(p.isHost || p.isCoHost) && (
                        <span className="text-[9px] bg-brand-500 text-ink-950 font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5 shrink-0">
                          <ShieldCheck size={10} />
                          {p.isHost ? 'Host' : 'Co-Host'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{p.role || 'Participant'}</p>
                  </div>
                </div>

                {/* Host Control Action Buttons per Row */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {!p.isSelf && (
                    <>
                      {/* Mute/Unmute Mic */}
                      <button
                        onClick={() => onToggleParticipantMic?.(p.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          p.muted
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                        title={p.muted ? 'Unmute Mic' : 'Mute Mic'}
                      >
                        {p.muted ? <MicOff size={14} /> : <Mic size={14} />}
                      </button>

                      {/* Stop/Start Video */}
                      <button
                        onClick={() => onToggleParticipantCam?.(p.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          !p.camOn
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                        title={!p.camOn ? 'Start Video' : 'Stop Video'}
                      >
                        {!p.camOn ? <VideoOff size={14} /> : <Video size={14} />}
                      </button>

                      {/* Make / Remove Co-Host */}
                      <button
                        onClick={() => onToggleCoHost?.(p.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          p.isCoHost
                            ? 'bg-brand-500 text-ink-950 font-bold border-brand-500'
                            : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
                        }`}
                        title={p.isCoHost ? 'Remove Co-Host' : 'Make Co-Host'}
                      >
                        <ShieldCheck size={14} />
                      </button>

                      {/* Private 1-on-1 Side Call */}
                      <button
                        onClick={() => {
                          onStartPrivateCall?.(p)
                          onClose()
                        }}
                        className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-ink-950 border border-emerald-500/30 transition-all cursor-pointer"
                        title="Start Private 1-on-1 Call"
                      >
                        <PhoneCall size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-white/10 bg-[#1a1d28] flex items-center justify-between gap-2">
          <button
            onClick={handleCopyInvite}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied Link' : 'Invite Link'}</span>
          </button>

          <button
            onClick={onMuteAll}
            className="px-4 py-2 text-xs font-extrabold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all cursor-pointer"
          >
            Mute All Participants
          </button>
        </div>
      </div>
    </div>
  )
}
