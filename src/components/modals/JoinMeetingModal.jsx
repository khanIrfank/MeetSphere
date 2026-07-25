import { useState } from 'react'
import { X } from 'lucide-react'

export default function JoinMeetingModal({ open, onClose, onJoin, defaultName = 'Irfan Khan' }) {
  const [meetingId, setMeetingId] = useState('')
  const [name, setName] = useState(defaultName)
  const [dontConnectAudio, setDontConnectAudio] = useState(false)
  const [turnOffVideo, setTurnOffVideo] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!meetingId.trim()) {
      setError('Please enter a valid Meeting ID or link name')
      return
    }
    setError('')
    onJoin({
      meetingId: meetingId.trim(),
      name: name.trim() || defaultName,
      dontConnectAudio,
      turnOffVideo,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-md bg-[#1a1a20] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col select-none">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#141418]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-ink-950 font-bold text-[10px]">
              MS
            </span>
            <span className="text-xs font-medium text-slate-300">MeetSphere</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-slate-100">Join meeting</h2>

          {error && (
            <div className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Meeting ID Field (Clean Input without useless chevron arrow) */}
          <div>
            <input
              type="text"
              placeholder="Meeting ID or personal link name"
              value={meetingId}
              onChange={(e) => { setMeetingId(e.target.value); setError('') }}
              className="w-full bg-[#26262d] border border-brand-500/50 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 text-slate-100 placeholder-slate-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
              autoFocus
            />
          </div>

          {/* User Name Field */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#26262d] border border-white/15 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-slate-100 placeholder-slate-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 py-1 text-sm text-slate-300">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontConnectAudio}
                onChange={(e) => setDontConnectAudio(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-400 h-4 w-4"
              />
              <span>Don&apos;t connect to audio</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={turnOffVideo}
                onChange={(e) => setTurnOffVideo(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-400 h-4 w-4"
              />
              <span>Turn off my video</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="submit"
              disabled={!meetingId.trim()}
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-ink-950 text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Join
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-transparent border border-white/20 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
