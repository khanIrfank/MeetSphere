import { useState } from 'react'
import { X, ScreenShare } from 'lucide-react'

export default function ShareScreenModal({ open, onClose, onShare }) {
  const [meetingId, setMeetingId] = useState('')
  const [error, setError] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!meetingId.trim()) {
      setError('Please enter room code or meeting ID')
      return
    }
    setError('')
    onShare(meetingId.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-md bg-[#1a1a20] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#141418]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-ink-950 font-bold text-[10px]">
              <ScreenShare size={14} />
            </span>
            <span className="text-xs font-medium text-slate-300">Share Screen</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-500/15 text-brand-400">
              <ScreenShare size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Share Screen</h2>
              <p className="text-xs text-slate-400">Enter a meeting ID or sharing key to share your screen.</p>
            </div>
          </div>

          {error && (
            <div className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Enter room code or meeting ID
            </label>
            <input
              type="text"
              placeholder="e.g. 812 4471 0032"
              value={meetingId}
              onChange={(e) => { setMeetingId(e.target.value); setError('') }}
              className="w-full bg-[#26262d] border border-brand-500/50 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 text-slate-100 placeholder-slate-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={!meetingId.trim()}
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-ink-950 text-sm font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all"
            >
              Share Screen
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-transparent border border-white/20 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
