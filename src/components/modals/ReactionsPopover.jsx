import { Hand } from 'lucide-react'

export default function ReactionsPopover({ open, onClose, onSelectReaction }) {
  if (!open) return null

  const emojis = [
    { emoji: '👏', label: 'Clap' },
    { emoji: '👍', label: 'Thumbs Up' },
    { emoji: '❤️', label: 'Heart' },
    { emoji: '😂', label: 'Joy' },
    { emoji: '😮', label: 'Open Mouth' },
    { emoji: '🎉', label: 'Tada' },
  ]

  return (
    <>
      {/* Backdrop overlay to close popover when tapping outside on mobile */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Floating Popover Container positioned with fixed to prevent overflow clipping on mobile */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e24] text-white rounded-2xl p-3 shadow-2xl border border-white/15 flex flex-col gap-2.5 animate-fade-up w-[290px] max-w-[90vw] select-none">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
          <span>Emoji Reactions</span>
          <button onClick={onClose} className="hover:text-white text-sm font-bold px-1.5 py-0.5 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="flex items-center justify-between gap-1 bg-[#141418] p-2 rounded-xl">
          {emojis.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onSelectReaction(item.emoji)
                onClose()
              }}
              title={item.label}
              className="text-2xl p-1.5 hover:bg-white/15 rounded-lg transition-transform hover:scale-125 active:scale-95 cursor-pointer"
            >
              {item.emoji}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onSelectReaction('✋ Hand Raised')
            onClose()
          }}
          className="w-full flex items-center justify-center gap-2 py-2 bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-brand-400 text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          <Hand size={16} />
          <span>Raise Hand</span>
        </button>
      </div>
    </>
  )
}
