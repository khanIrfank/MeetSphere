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
} from 'lucide-react'
import ReactionsPopover from '../modals/ReactionsPopover'

export default function MeetingControls({
  muted,
  camOn,
  chatOpen,
  isSharing,
  participantCount = 1,
  onToggleMute,
  onToggleCam,
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
  const [selectedCam, setSelectedCam] = useState('USB2.0 FHD WebCam')

  return (
    <div className="relative bg-[#0d0d10] text-slate-200 border-t border-white/10 px-3 py-2 flex items-center justify-between shadow-2xl select-none z-30">
      {/* Center Action Bar */}
      <div className="flex items-center justify-center gap-1 sm:gap-2.5 mx-auto">
        {/* Audio Button with Dropdown Chevron */}
        <div className="relative flex items-center">
          <button
            onClick={onToggleMute}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10 ${
              muted ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {muted ? <MicOff size={20} /> : <Mic size={20} />}
            <span className="text-[10px] font-medium hidden sm:block">
              {muted ? 'Unmute' : 'Mute'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowMicMenu(!showMicMenu)
              setShowCamMenu(false)
            }}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/10"
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
                  selectedMic === 'Built-in Microphone' ? 'text-blue-400 font-semibold' : ''
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
                  selectedMic === 'External Headset' ? 'text-blue-400 font-semibold' : ''
                }`}
              >
                External Headset (Bluetooth)
              </button>
            </div>
          )}
        </div>

        {/* Video Button with Dropdown Chevron */}
        <div className="relative flex items-center">
          <button
            onClick={onToggleCam}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10 ${
              !camOn ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {!camOn ? <VideoOff size={20} /> : <Video size={20} />}
            <span className="text-[10px] font-medium hidden sm:block">
              {camOn ? 'Stop Video' : 'Start Video'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowCamMenu(!showCamMenu)
              setShowMicMenu(false)
            }}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/10"
          >
            <ChevronUp size={12} />
          </button>

          {/* Cam Selection Popup */}
          {showCamMenu && (
            <div className="absolute bottom-12 left-0 z-50 bg-[#1e1e24] text-xs text-slate-200 border border-white/15 rounded-xl p-2 w-56 shadow-2xl animate-fade-up">
              <p className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select a Camera
              </p>
              <button
                onClick={() => {
                  setSelectedCam('USB2.0 FHD WebCam')
                  setShowCamMenu(false)
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  selectedCam === 'USB2.0 FHD WebCam' ? 'text-blue-400 font-semibold' : ''
                }`}
              >
                USB2.0 FHD WebCam
              </button>
              <button
                onClick={() => {
                  setSelectedCam('Integrated HD Camera')
                  setShowCamMenu(false)
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 ${
                  selectedCam === 'Integrated HD Camera' ? 'text-blue-400 font-semibold' : ''
                }`}
              >
                Integrated HD Camera
              </button>
            </div>
          )}
        </div>

        {/* Participants Button */}
        <button
          onClick={onOpenParticipants}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-slate-200 hover:bg-white/10 transition-colors relative"
        >
          <div className="relative">
            <Users size={20} />
            <span className="absolute -top-1 -right-2 text-[9px] bg-slate-700 text-white font-bold rounded-full px-1.5 py-0.2">
              {participantCount}
            </span>
          </div>
          <span className="text-[10px] font-medium hidden sm:block">Participants</span>
        </button>

        {/* Chat Button */}
        <button
          onClick={onToggleChat}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10 ${
            chatOpen ? 'text-blue-400 bg-blue-500/10' : 'text-slate-200'
          }`}
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-medium hidden sm:block">Chat</span>
        </button>

        {/* React Button (Emoji Reactions) */}
        <div className="relative">
          <button
            onClick={() => setReactionsOpen(!reactionsOpen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10 ${
              reactionsOpen ? 'text-amber-400 bg-amber-500/10' : 'text-slate-200'
            }`}
          >
            <Smile size={20} />
            <span className="text-[10px] font-medium hidden sm:block">React</span>
          </button>
          <ReactionsPopover
            open={reactionsOpen}
            onClose={() => setReactionsOpen(false)}
            onSelectReaction={onTriggerReaction}
          />
        </div>

        {/* Share Screen Button (Green indicator style) */}
        <button
          onClick={onToggleShare}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
            isSharing
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'text-emerald-400 hover:bg-emerald-500/15'
          }`}
        >
          <ScreenShare size={20} />
          <span className="text-[10px] font-medium hidden sm:block">
            {isSharing ? 'Stop Share' : 'Share'}
          </span>
        </button>

        {/* Meeting Info Button (Replaced Host Tools / More) */}
        <button
          onClick={onOpenMeetingInfo}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-slate-200 hover:bg-white/10 transition-colors"
        >
          <Info size={20} className="text-blue-400" />
          <span className="text-[10px] font-medium hidden sm:block">Meeting Info</span>
        </button>
      </div>

      {/* End / Leave Button on Right */}
      <button
        onClick={onLeave}
        className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all hover:scale-105"
      >
        <X size={16} />
        <span>End</span>
      </button>
    </div>
  )
}
