import { AlertTriangle, X, Power, ShieldAlert } from 'lucide-react'

export default function DeactivatePlanModal({ open, onClose, planToDeactivate, onConfirmDeactivate }) {
  if (!open || !planToDeactivate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-up select-none">
      <div className="bg-[#12141c] text-white border border-rose-500/30 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-rose-500/10 shrink-0">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert size={20} />
            <h3 className="font-extrabold text-sm sm:text-base text-white">Deactivate Room Plan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 mx-auto shadow-lg">
            <AlertTriangle size={32} />
          </div>

          <div>
            <h4 className="font-extrabold text-lg sm:text-xl text-white">
              Deactivate {planToDeactivate.name}?
            </h4>
            <p className="text-xs text-slate-300 font-medium mt-1.5 leading-relaxed">
              Are you sure you want to deactivate this plan? You will immediately lose access to this room tier&apos;s hosting capacity.
            </p>
          </div>

          {/* Lost Capacity Warning Pill */}
          <div className="bg-surface/70 border border-rose-500/25 rounded-2xl p-3 text-xs text-left space-y-1.5">
            <p className="text-[10px] font-extrabold uppercase text-rose-400">Capacity Lost Upon Deactivation:</p>
            <div className="flex items-center justify-between font-bold text-white">
              <span>Co-Host Slots:</span>
              <span className="text-rose-400">👤 {planToDeactivate.maxHosts} {planToDeactivate.maxHosts === 1 ? 'Host' : 'Hosts'}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-white">
              <span>Max Participants:</span>
              <span className="text-rose-400">👥 {planToDeactivate.maxUsers.toLocaleString()} Users</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-white/10 bg-surface/40 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            Keep My Plan
          </button>
          <button
            onClick={() => {
              onConfirmDeactivate(planToDeactivate.id)
              onClose()
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Power size={14} />
            <span>Yes, Deactivate</span>
          </button>
        </div>
      </div>
    </div>
  )
}
