import { useState, useEffect } from 'react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  MessageSquare,
  Users,
  Info,
  X,
  ChevronUp,
  RefreshCw,
  Hash,
} from 'lucide-react'

export default function MeetingControls({
  muted,
  camOn,
  facingMode = 'user',
  hostsOpen,
  chatOpen,
  usersOpen,
  isSharing,
  participantCount = 500,
  onToggleMute,
  onToggleCam,
  onToggleFacingMode,
  onToggleHosts,
  onToggleChat,
  onToggleParticipants,
  onToggleShare,
  onOpenMeetingInfo,
  onSelectTestingCount,
  onLeave,
}) {
  const [showMicMenu, setShowMicMenu] = useState(false)
  const [showCamMenu, setShowCamMenu] = useState(false)
  const [showCountMenu, setShowCountMenu] = useState(false)
  const [selectedMic, setSelectedMic] = useState('Built-in Microphone')

  // OS Device Detection: Only true for Android, iPhone, iPad, Mobile OS
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera || ''
      const mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      setIsMobileDevice(mobileRegExp.test(userAgent))
    }
  }, [])

  const countOptions = [1, 2, 4, 10, 50, 100, 200, 500, 1000]

  return (
    <div className="relative bg-[#0b0c10] text-slate-200 border-t border-white/10 px-2 sm:px-4 py-2 flex items-center justify-between shadow-2xl select-none z-40 gap-1 sm:gap-2">
      {/* Scrollable Center Action Bar */}
      <div className="flex-1 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
        {/* Audio Button with Dropdown Chevron */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={onToggleMute}
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl transition-colors hover:bg-white/10 cursor-pointer ${
              muted ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
            <span className="text-[10px] font-semibold hidden sm:block">
              {muted ? 'Unmute' : 'Mute'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowMicMenu(!showMicMenu)
              setShowCamMenu(false)
              setShowCountMenu(false)
            }}
            className="p-0.5 text-slate-400 hover:text-slate-200 rounded hover:bg-white/10 cursor-pointer hidden sm:block"
          >
            <ChevronUp size={12} />
          </button>

          {/* Mic Selection Popup */}
          {showMicMenu && (
            <div className="fixed bottom-16 left-4 z-[100] bg-[#1e1e24] text-xs text-slate-200 border border-white/15 rounded-xl p-2 w-56 shadow-2xl animate-fade-up">
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
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl transition-colors hover:bg-white/10 cursor-pointer ${
              !camOn ? 'text-rose-400' : 'text-slate-200'
            }`}
          >
            {!camOn ? <VideoOff size={18} /> : <Video size={18} />}
            <span className="text-[10px] font-semibold hidden sm:block">
              {camOn ? 'Stop Video' : 'Start Video'}
            </span>
          </button>
          <button
            onClick={() => {
              setShowCamMenu(!showCamMenu)
              setShowMicMenu(false)
              setShowCountMenu(false)
            }}
            className="p-0.5 text-slate-400 hover:text-slate-200 rounded hover:bg-white/10 cursor-pointer hidden sm:block"
          >
            <ChevronUp size={12} />
          </button>

          {/* Cam Selection Popup */}
          {showCamMenu && (
            <div className="fixed bottom-16 left-16 z-[100] bg-[#1e1e24] text-xs text-slate-200 border border-white/15 rounded-xl p-2 w-60 shadow-2xl animate-fade-up">
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

        {/* Flip Camera Button - STRICTLY RENDERED FOR MOBILE / TABLET OS (Android / iOS) ONLY! */}
        {camOn && isMobileDevice && (
          <button
            onClick={onToggleFacingMode}
            title={`Switch to ${facingMode === 'user' ? 'Back' : 'Front'} Camera`}
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors hover:bg-white/10 shrink-0 cursor-pointer ${
              facingMode === 'environment' ? 'text-brand-400 bg-brand-500/15' : 'text-slate-300'
            }`}
          >
            <RefreshCw size={18} className={facingMode === 'environment' ? 'rotate-180 transition-transform duration-300' : ''} />
            <span className="text-[10px] font-semibold">
              {facingMode === 'user' ? 'Flip Cam' : 'Front Cam'}
            </span>
          </button>
        )}

        {/* Participants Button (Toggles Users Panel!) */}
        <button
          onClick={onToggleParticipants}
          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl transition-colors shrink-0 cursor-pointer ${
            usersOpen ? 'text-brand-400 bg-brand-500/20 font-bold' : 'text-slate-200 hover:bg-white/10'
          }`}
          title="Toggle Users Panel"
        >
          <div className="relative">
            <Users size={18} />
            <span className="absolute -top-1.5 -right-3 text-[9px] bg-brand-500 text-ink-950 font-extrabold rounded-full px-1.5 py-0.2">
              {participantCount.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] font-semibold hidden sm:block">Participants</span>
        </button>

        {/* Chat Button (Toggles Chat Panel!) */}
        <button
          onClick={onToggleChat}
          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl transition-colors shrink-0 cursor-pointer ${
            chatOpen ? 'text-brand-400 bg-brand-500/20 font-bold' : 'text-slate-200 hover:bg-white/10'
          }`}
          title="Toggle Chat Panel"
        >
          <MessageSquare size={18} />
          <span className="text-[10px] font-semibold hidden sm:block">Chat</span>
        </button>

        {/* Share Screen Button */}
        <button
          onClick={onToggleShare}
          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl transition-colors shrink-0 cursor-pointer ${
            isSharing
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'text-emerald-400 hover:bg-emerald-500/15'
          }`}
        >
          <ScreenShare size={18} />
          <span className="text-[10px] font-semibold hidden sm:block">
            {isSharing ? 'Stop Share' : 'Share'}
          </span>
        </button>

        {/* Meeting Info Button */}
        <button
          onClick={onOpenMeetingInfo}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-2.5 rounded-xl text-slate-200 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          <Info size={18} className="text-brand-400" />
          <span className="text-[10px] font-semibold hidden sm:block">Meeting Info</span>
        </button>

        {/* TESTING TOOL: "# No." Quick Participant Count Selector Button */}
        <div className="shrink-0">
          <button
            onClick={() => {
              setShowCountMenu(!showCountMenu)
              setShowMicMenu(false)
              setShowCamMenu(false)
            }}
            className={`flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 sm:px-3 rounded-xl transition-all cursor-pointer border ${
              showCountMenu
                ? 'border-brand-400 bg-brand-500/30 text-brand-400 shadow-lg ring-2 ring-brand-500/40'
                : 'border-brand-500/40 bg-brand-500/15 text-brand-400 hover:bg-brand-500/25'
            }`}
            title="Testing Tool: Simulate 1 to 1,000+ Participants Layout"
          >
            <div className="flex items-center gap-0.5 font-mono font-extrabold text-xs">
              <Hash size={14} />
              <span>No.</span>
            </div>
            <span className="text-[9px] font-extrabold uppercase hidden sm:block">Test Layout</span>
          </button>

          {/* FIXED POPUP OVERLAY */}
          {showCountMenu && (
            <>
              <div
                className="fixed inset-0 z-[90]"
                onClick={() => setShowCountMenu(false)}
              />
              <div className="fixed bottom-16 right-4 sm:right-28 z-[100] bg-[#161922] text-xs text-white border-2 border-brand-500/60 rounded-2xl p-3.5 w-64 shadow-2xl animate-fade-up space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <p className="text-[11px] font-extrabold text-brand-400 uppercase tracking-wider">
                      ⚡ Test Screen Layouts
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Select count to test auto-adjust grid:</p>
                  </div>
                  <button
                    onClick={() => setShowCountMenu(false)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {countOptions.map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => {
                        onSelectTestingCount?.(cnt)
                        setShowCountMenu(false)
                      }}
                      className={`py-2 px-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        participantCount === cnt
                          ? 'bg-brand-500 text-ink-950 border-brand-400 shadow-md font-black scale-105'
                          : 'bg-surface hover:bg-white/15 text-slate-200 border-white/10'
                      }`}
                    >
                      {cnt} {cnt === 1 ? 'User' : 'Users'}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* End / Leave Button on Right */}
      <button
        onClick={onLeave}
        className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
      >
        <X size={15} />
        <span>End</span>
      </button>
    </div>
  )
}
