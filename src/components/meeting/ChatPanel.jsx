import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageSquare, Smile } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ChatPanel({ messages, onSend, onClose, currentUserName = 'You' }) {
  const [text, setText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#141418] text-slate-100 border-l border-white/10 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#1a1a20]">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-brand-400" />
          <h3 className="font-semibold text-xs sm:text-sm text-slate-100">In-meeting Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {messages.map((m) => {
          const isSelf = m.author === 'You' || m.author === currentUserName
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 max-w-[88%] ${isSelf ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {!isSelf && <Avatar name={m.author} size={30} />}

              <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-semibold text-slate-300">
                    {isSelf ? 'You' : m.author}
                  </span>
                  <span className="text-[9px] text-slate-400">{m.time}</span>
                </div>

                <div
                  className={`px-3.5 py-2.5 text-xs rounded-2xl shadow-sm break-words leading-relaxed ${
                    isSelf
                      ? 'bg-brand-500 text-ink-950 font-medium rounded-tr-none'
                      : 'bg-[#26262d] text-slate-100 rounded-tl-none border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-[#1a1a20] flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message everyone..."
          className="flex-1 rounded-xl bg-[#26262d] border border-white/15 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-400 outline-none focus:border-brand-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-ink-950 font-bold transition-transform active:scale-95 shrink-0"
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}
