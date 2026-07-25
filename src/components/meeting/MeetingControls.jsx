import { useState } from 'react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  MessageSquare,
  Users,
  Smile,
  Info,
  X,
  ChevronUp,
  RefreshCw,
} from 'lucide-react'
import ReactionsPopover from '../modals/ReactionsPopover'

export default function MeetingControls({
  muted,
  camOn,
  facingMode = 'user',
  chatOpen,
  isSharing,
  participantCount = 1,
  onToggleMute,
  onToggleCam,
  onToggleFacingMode,
  onToggleChat,
  onToggleShare,
  onOpenParticipants,
  onOpenMeetingInfo,
  onTriggerReaction,
  onLeave,
}) {
  const [showMicMenu, setShowMicMenu] = useState(false)
  const [showCamMenu, setShowCamMenu] = useState(false)
  const [reactionsOpen, setReactionsOpen] = useState(false)
  const [selectedMic, setSelectedMic] = useState('Built-in Microphone')

  return (
    <div className="relative bg-[#0d0d10] text-slate-200 border-t border-white/10 px-2 sm:px-4 py-2 flex items-center justify-between shadow-2xl select-none z-30 gap-1 sm:gap-2">
      {/* Scrollable Center Action Bar for Mobile Responsiveness */}
      <div className="flex-1 flex items-center justify-start sm:justify-center gap-1 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
        {/* Audio Button with Dropdown Chevron */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={onToggleMute}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 cursor-pointer ${
              muted ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
            <span className="text-[10px] font-medium hidden sm:block">
              {muted ? 'Unmute' : 'Mute'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowMicMenu(!showMicMenu)
              setShowCamMenu(false)
            }}
            className="p-0.5 text-slate-400 hover:text-slate-200 rounded hover:bg-white/10 cursor-pointer hidden sm:block"
          >
            <ChevronUp size={12} />
          </button>

          {/* Mic Selection Popup */}
          {showMicMenu && (
            <div className="absolute bottom-12 left-0 z-50 bg-[#1e1e24] text-xs text-slate-200 border border-white/15 rounded-xl p-2 w-56 shadow-2xl animate-fade-up">
              <p className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select a Microphone
              </p>
              <button
                onClick={() => {
                  setSelectedMic('Built-in Microphone')
                  setShowMicMenu(false)
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  selectedMic === 'Built-in Microphone' ? 'text-brand-400 font-semibold' : ''
                }`}
              >
                Built-in Microphone & Speakers
              </button>
              <button
                onClick={() => {
                  setSelectedMic('External Headset')
                  setShowMicMenu(false)
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  selectedMic === 'External Headset' ? 'text-brand-400 font-semibold' : ''
                }`}
              >
                External Headset (Bluetooth)
              </button>
            </div>
          )}
        </div>

        {/* Video Button with Dropdown Chevron */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={onToggleCam}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 cursor-pointer ${
              !camOn ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {!camOn ? <VideoOff size={18} /> : <Video size={18} />}
            <span className="text-[10px] font-medium hidden sm:block">
              {camOn ? 'Stop Video' : 'Start Video'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowCamMenu(!showCamMenu)
              setShowMicMenu(false)
            }}
            className="p-0.5 text-slate-400 hover:text-slate-200 rounded hover:bg-white/10 cursor-pointer hidden sm:block"
          >
            <ChevronUp size={12} />
          </button>

          {/* Cam Selection & Flip Popup */}
          {showCamMenu && (
            <div className="absolute bottom-12 left-0 z-50 bg-[#1e1e24] text-xs text-slate-200 border border-white/15 rounded-xl p-2 w-60 shadow-2xl animate-fade-up">
              <p className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Camera Source
              </p>
              <button
                onClick={() => {
                  if (facingMode !== 'user') onToggleFacingMode?.()
                  setShowCamMenu(false)
                }}
                className={`w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  facingMode === 'user' ? 'text-brand-400 font-semibold' : ''
                }`}
              >
                <span>Front Selfie Camera</span>
                {facingMode === 'user' && <span className="text-[9px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded font-bold">Active</span>}
              </button>
              <button
                onClick={() => {
                  if (facingMode !== 'environment') onToggleFacingMode?.()
                  setShowCamMenu(false)
                }}
                className={`w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  facingMode === 'environment' ? 'text-brand-400 font-semibold' : ''
                }`}
              >
                <span>Back Rear Camera</span>
                {facingMode === 'environment' && <span className="text-[9px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded font-bold">Active</span>}
              </button>
            </div>
          )}
        </div>

        {/* Flip Camera Button (Direct 1-tap Front/Back camera toggle) */}
        {camOn && (
          <button
            onClick={onToggleFacingMode}
            title={`Switch to ${facingMode === 'user' ? 'Back' : 'Front'} Camera`}
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-white/10 shrink-0 cursor-pointer ${
              facingMode === 'environment' ? 'text-brand-400 bg-brand-500/15' : 'text-slate-300'
            }`}
          >
            <RefreshCw size={18} className={facingMode === 'environment' ? 'rotate-180 transition-transform duration-300' : ''} />
            <span className="text-[10px] font-medium hidden sm:block">
              {facingMode === 'user' ? 'Flip Cam' : 'Front Cam'}
            </span>
          </button>
        )}

        {/* Participants Button */}
        <button
          onClick={onOpenParticipants}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-slate-200 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          <div className="relative">
            <Users size={18} />
            <span className="absolute -top-1.5 -right-2.5 text-[9px] bg-brand-500 text-ink-950 font-extrabold rounded-full px-1.5 py-0.2">
              {participantCount}
            </span>
          </div>
          <span className="text-[10px] font-medium hidden sm:block">Participants</span>
        </button>

        {/* Chat Button */}
        <button
          onClick={onToggleChat}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 shrink-0 cursor-pointer ${
            chatOpen ? 'text-brand-400 bg-brand-500/15' : 'text-slate-200'
          }`}
        >
          <MessageSquare size={18} />
          <span className="text-[10px] font-medium hidden sm:block">Chat</span>
        </button>

        {/* React Button (Emoji Reactions) */}
        <div className="relative shrink-0">
          <button
            onClick={() => setReactionsOpen(!reactionsOpen)}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 cursor-pointer ${
              reactionsOpen ? 'text-amber-400 bg-amber-500/15' : 'text-slate-200'
            }`}
          >
            <Smile size={18} />
            <span className="text-[10px] font-medium hidden sm:block">React</span>
          </button>
          <ReactionsPopover
            open={reactionsOpen}
            onClose={() => setReactionsOpen(false)}
            onSelectReaction={onTriggerReaction}
          />
        </div>

        {/* Share Screen Button */}
        <button
          onClick={onToggleShare}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer ${
            isSharing
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'text-emerald-400 hover:bg-emerald-500/15'
          }`}
        >
          <ScreenShare size={18} />
          <span className="text-[10px] font-medium hidden sm:block">
            {isSharing ? 'Stop Share' : 'Share'}
          </span>
        </button>

        {/* Meeting Info Button */}
        <button
          onClick={onOpenMeetingInfo}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-slate-200 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          <Info size={18} className="text-brand-400" />
          <span className="text-[10px] font-medium hidden sm:block">Meeting Info</span>
        </button>
      </div>

      {/* End / Leave Button on Right */}
      <button
        onClick={onLeave}
        className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
      >
        <X size={15} />
        <span>End</span>
      </button>
    </div>
  )
}
