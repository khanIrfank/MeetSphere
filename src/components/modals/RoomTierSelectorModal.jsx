import { useState } from 'react'
import { X, Check, Users, ShieldCheck, Sparkles, ArrowRight, Video } from 'lucide-react'
import { usePlan } from '../../context/PlanContext'

export default function RoomTierSelectorModal({ open, onClose, onConfirmSelection }) {
  const { activePlanId, initiateCheckout, canAccessRoomTier, ROOM_PLANS } = usePlan()
  const [selectedTierId, setSelectedTierId] = useState(activePlanId)

  if (!open) return null

  const selectedPlan = ROOM_PLANS.find((p) => p.id === selectedTierId) || ROOM_PLANS[0]
  const isHigherTierThanActive = !canAccessRoomTier(selectedTierId)

  const handleProceed = () => {
    if (isHigherTierThanActive) {
      onClose()
      initiateCheckout(selectedTierId)
    } else {
      onConfirmSelection(selectedPlan)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-up select-none">
      <div className="bg-[#12141c] text-white border border-white/15 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-surface/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-500 text-ink-950 font-bold">
              <Video size={16} />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">Select Meeting Room Capacity</h3>
              <p className="text-[11px] text-slate-400 font-medium">Choose room tier for host & participant limits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 scrollbar-custom">
          {/* Room Tiers Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROOM_PLANS.map((plan) => {
              const isSelected = selectedTierId === plan.id
              const isUnlocked = canAccessRoomTier(plan.id)

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedTierId(plan.id)}
                  className={`rounded-2xl p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/10'
                      : 'border-white/10 bg-surface/40 hover:border-white/20'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold bg-white/10 text-brand-400 px-2 py-0.5 rounded-full uppercase">
                      {plan.badge}
                    </span>
                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-ink-950">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white">{plan.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-black/40 px-2 py-1 rounded-lg border border-white/5 text-[11px] text-slate-300 font-semibold">
                        👤 {plan.maxHosts} {plan.maxHosts === 1 ? 'Host' : 'Hosts'}
                      </div>
                      <div className="bg-black/40 px-2 py-1 rounded-lg border border-white/5 text-[11px] text-brand-400 font-bold">
                        👥 {plan.maxUsers.toLocaleString()} Users
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white">{plan.priceDisplay}</span>
                    {!isUnlocked ? (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Requires Upgrade
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-bold">Unlocked</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected Plan Summary Banner */}
          <div className="bg-surface/60 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Selected: {selectedPlan.name}</p>
              <p className="text-[11px] text-slate-400 font-medium">
                {selectedPlan.maxHosts} Co-Hosts • {selectedPlan.maxUsers.toLocaleString()} Max Participants
              </p>
            </div>
            {isHigherTierThanActive && (
              <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                <Sparkles size={14} /> Upgrade Plan
              </span>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 border-t border-white/10 bg-surface/40 shrink-0 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>{isHigherTierThanActive ? 'Upgrade & Unlock Room' : 'Confirm Room Capacity'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
