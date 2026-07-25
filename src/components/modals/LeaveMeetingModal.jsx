import { useState } from 'react'

export default function LeaveMeetingModal({ open, onClose, onLeave, onEndAll }) {
  const [giveFeedback, setGiveFeedback] = useState(false)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-sm bg-[#1e1e24] text-white rounded-2xl p-5 shadow-2xl border border-white/10 flex flex-col gap-3 select-none">
        {/* End meeting for all button */}
        <button
          onClick={() => onEndAll({ giveFeedback })}
          className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          End meeting for all
        </button>

        {/* Leave meeting button */}
        <button
          onClick={() => onLeave({ giveFeedback })}
          className="w-full py-3 bg-[#32323a] hover:bg-[#3d3d46] text-white font-extrabold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Leave meeting
        </button>

        {/* Bottom row: Feedback checkbox & Cancel */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-300 font-medium">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={giveFeedback}
              onChange={(e) => setGiveFeedback(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-400 h-4 w-4"
            />
            <span>Give feedback</span>
          </label>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-semibold transition-colors px-2 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
