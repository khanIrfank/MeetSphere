import { useState } from 'react'
import { X, Copy, Check, ShieldCheck, Info } from 'lucide-react'

export default function MeetingInfoModal({ open, onClose, meetingData = {} }) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const meetingId = meetingData.meetingId || '849 2039 1042'
  const passcode = meetingData.passcode || '982341'
  const hostId = meetingData.hostId || 'Host-9921'
  const inviteLink = `${window.location.origin}/app/room/${meetingId.replace(/\s+/g, '')}`

  const handleCopy = () => {
    const text = `Meeting Title: ${meetingData.title || "MeetSphere Meeting"}\nMeeting ID: ${meetingId}\nPasscode: ${passcode}\nJoin Link: ${inviteLink}`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-md bg-[#1a1a20] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#141418]">
          <div className="flex items-center gap-2">
            <Info size={18} className="text-brand-400" />
            <h3 className="text-sm font-semibold text-slate-100">Meeting Information</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-xs">
            <ShieldCheck size={16} />
            <span>Enhanced Encryption Active · Safe & Secure</span>
          </div>

          <div className="space-y-3 bg-[#26262d] border border-white/10 p-4 rounded-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
              <span className="text-slate-400">Meeting ID:</span>
              <span className="font-mono font-semibold text-slate-100">{meetingId}</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
              <span className="text-slate-400">Passcode:</span>
              <span className="font-mono font-semibold text-slate-100">{passcode}</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
              <span className="text-slate-400">Host Participant ID:</span>
              <span className="font-mono font-semibold text-slate-100">{hostId}</span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-slate-400">Invite Link:</span>
              <div className="flex items-center gap-2 bg-[#141418] border border-white/10 rounded-lg p-2 font-mono text-xs text-brand-300 overflow-hidden">
                <span className="truncate flex-1">{inviteLink}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 shrink-0 bg-brand-500 hover:bg-brand-400 text-ink-950 px-2.5 py-1 rounded-md transition-colors text-xs font-sans font-semibold"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-brand-500 hover:bg-brand-400 text-ink-950 text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
