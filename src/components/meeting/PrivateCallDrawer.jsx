import { useState } from 'react'
import { X, Mic, MicOff, Video, VideoOff, MessageSquare, PhoneOff, Lock, UserCheck, Shield } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function PrivateCallDrawer({ open, onClose, hostName = 'You', targetParticipant, mediaStream }) {
  const [privateMuted, setPrivateMuted] = useState(false)
  const [privateCamOn, setPrivateCamOn] = useState(true)
  const [privateMessages, setPrivateMessages] = useState([
    { id: 1, author: 'System', text: '🔐 Private 1-on-1 encrypted channel established with Host.', time: 'Now' },
  ])
  const [inputText, setInputText] = useState('')

  if (!open || !targetParticipant) return null

  const handleSendPrivateMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    setPrivateMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: hostName,
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInputText('')
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#0f1117] text-white border-l border-brand-500/30 shadow-2xl flex flex-col animate-slide-left select-none">
      {/* Drawer Header */}
      <div className="px-4 py-3.5 bg-[#161922] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Lock size={15} />
          </span>
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
              <span>Private 1-on-1 Side Call</span>
              <span className="text-[9px] bg-brand-500 text-ink-950 px-1.5 py-0.2 rounded font-extrabold">LIVE</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Host side call with {targetParticipant.name}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close Private Call"
        >
          <X size={18} />
        </button>
      </div>

      {/* Video Call Stage (2 Split Screen Boxes: Host & Target Participant) */}
      <div className="p-3 grid grid-cols-2 gap-2 bg-black/60 border-b border-white/10 shrink-0">
        {/* Host Local Video Box */}
        <div className="relative aspect-video bg-[#1a1d26] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
          {mediaStream && privateCamOn ? (
            <video
              ref={(ref) => {
                if (ref) ref.srcObject = mediaStream
              }}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Avatar name={hostName} size={40} />
          )}
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
            <UserCheck size={10} className="text-brand-400" />
            <span>You (Host)</span>
          </div>
        </div>

        {/* Participant Video Box */}
        <div className="relative aspect-video bg-[#1a1d26] rounded-xl overflow-hidden border border-brand-500/30 flex items-center justify-center">
          <Avatar name={targetParticipant.name} size={40} />
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate max-w-[80px]">{targetParticipant.name}</span>
          </div>
        </div>
      </div>

      {/* Private Control Action Buttons */}
      <div className="px-4 py-2 bg-[#161922] border-b border-white/10 flex items-center justify-around gap-2 shrink-0">
        <button
          onClick={() => setPrivateMuted((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            privateMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {privateMuted ? <MicOff size={14} /> : <Mic size={14} />}
          <span>{privateMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        <button
          onClick={() => setPrivateCamOn((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !privateCamOn ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {!privateCamOn ? <VideoOff size={14} /> : <Video size={14} />}
          <span>{privateCamOn ? 'Cam On' : 'Cam Off'}</span>
        </button>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all cursor-pointer"
        >
          <PhoneOff size={14} />
          <span>End Side Call</span>
        </button>
      </div>

      {/* Dedicated Private Chat Panel */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#0f1117]">
        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
          <MessageSquare size={14} className="text-brand-400" />
          <span>Private Direct Messages</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {privateMessages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.author === hostName ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                <span className="font-bold text-slate-300">{m.author}</span>
                <span>• {m.time}</span>
              </div>
              <div className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] font-medium ${
                m.author === 'System'
                  ? 'bg-brand-500/10 border border-brand-500/30 text-brand-300 text-center w-full'
                  : (m.author === hostName ? 'bg-brand-500 text-ink-950 font-bold' : 'bg-surface text-slate-200 border border-white/10')
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Private Chat Input Bar */}
        <form onSubmit={handleSendPrivateMessage} className="p-3 border-t border-white/10 bg-[#161922] flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={`Message ${targetParticipant.name} privately...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs cursor-pointer shrink-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
