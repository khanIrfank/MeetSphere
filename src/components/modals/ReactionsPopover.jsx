import { Hand, ThumbsUp, Heart, Smile, Sparkles, PartyPopper } from 'lucide-react'

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
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e24] text-white rounded-2xl p-3 shadow-2xl border border-white/15 flex flex-col gap-2.5 animate-fade-up min-w-[280px]">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
        <span>Reactions</span>
        <button onClick={onClose} className="hover:text-white">✕</button>
      </div>

      <div className="flex items-center justify-between gap-1.5 bg-[#141418] p-2 rounded-xl">
        {emojis.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              onSelectReaction(item.emoji)
              onClose()
            }}
            title={item.label}
            className="text-xl p-1.5 hover:bg-white/15 rounded-lg transition-transform hover:scale-125 active:scale-95"
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
        className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-xl transition-colors"
      >
        <Hand size={15} />
        <span>Raise Hand</span>
      </button>
    </div>
  )
}
