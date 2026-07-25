import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Info, Shield, LayoutGrid, Maximize2, ScreenShare, Moon, Sun } from 'lucide-react'

import ParticipantTile from '../../components/meeting/ParticipantTile'
import MeetingControls from '../../components/meeting/MeetingControls'
import ChatPanel from '../../components/meeting/ChatPanel'

import MeetingInfoModal from '../../components/modals/MeetingInfoModal'
import ParticipantsModal from '../../components/modals/ParticipantsModal'
import LeaveMeetingModal from '../../components/modals/LeaveMeetingModal'

import { mockParticipants, mockChatMessages } from '../../data/meetings'
import { useAuth } from '../../context/AuthContext'
import { useMeetings } from '../../context/MeetingsContext'

export default function MeetingRoom() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addHistoryEntry } = useMeetings()

  // Room Theme state (synced with body class)
  const [isLightMode, setIsLightMode] = useState(() => {
    return document.documentElement.classList.contains('theme-light')
  })

  // Query params
  const initialMuted = searchParams.get('muted') === 'true'
  const initialVideoOff = searchParams.get('videoOff') === 'true'
  const autoStartShare = searchParams.get('screenshare') === 'true'
  const customName = searchParams.get('name') || user?.name || 'Irfan Khan'

  // Room states
  const [muted, setMuted] = useState(initialMuted)
  const [camOn, setCamOn] = useState(!initialVideoOff)
  const [chatOpen, setChatOpen] = useState(false)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [participantsModalOpen, setParticipantsModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [messages, setMessages] = useState(mockChatMessages)

  // Media Streams & Screen Sharing
  const [mediaStream, setMediaStream] = useState(null)
  const [screenStream, setScreenStream] = useState(null)
  const [isSharing, setIsSharing] = useState(false)

  // Floating Emoji Reactions State
  const [activeReactions, setActiveReactions] = useState([])

  const screenVideoRef = useRef(null)

  const toggleRoomTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('theme-light')
      } else {
        document.documentElement.classList.remove('theme-light')
      }
      return next
    })
  }

  // Intercept browser back button or navigation
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault()
      window.history.pushState(null, '', window.location.href)
      setLeaveModalOpen(true)
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Setup Webcam Stream
  useEffect(() => {
    let streamTrack = null
    if (camOn) {
      navigator.mediaDevices?.getUserMedia?.({ video: true, audio: true })
        .then((s) => {
          streamTrack = s
          setMediaStream(s)
        })
        .catch(() => {
          setMediaStream(null)
        })
    } else {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop())
        setMediaStream(null)
      }
    }
    return () => {
      if (streamTrack) streamTrack.getTracks().forEach((t) => t.stop())
    }
  }, [camOn])

  // Handle Mute Track
  useEffect(() => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !muted
      })
    }
  }, [muted, mediaStream])

  // Screen Share Handler
  const handleToggleShare = async () => {
    if (isSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop())
      }
      setScreenStream(null)
      setIsSharing(false)
    } else {
      try {
        const stream = await navigator.mediaDevices?.getDisplayMedia({ video: true, audio: true })
        setScreenStream(stream)
        setIsSharing(true)

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream
        }

        stream.getVideoTracks()[0].onended = () => {
          setScreenStream(null)
          setIsSharing(false)
        }
      } catch (err) {
        console.log('Screen sharing cancelled or unavailable:', err)
      }
    }
  }

  // Trigger auto screen share if launcher parameter is present
  useEffect(() => {
    if (autoStartShare && !isSharing) {
      handleToggleShare()
    }
  }, [autoStartShare])

  useEffect(() => {
    if (screenStream && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStream
    }
  }, [screenStream, isSharing])

  const participantsList = mockParticipants.map((p) =>
    p.isSelf ? { ...p, name: customName, muted, camOn } : p
  )

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: customName,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  const handleTriggerReaction = (emojiStr) => {
    const reactionId = Date.now() + Math.random()
    const leftOffset = Math.floor(20 + Math.random() * 60)
    setActiveReactions((prev) => [...prev, { id: reactionId, emoji: emojiStr, left: leftOffset }])

    setTimeout(() => {
      setActiveReactions((prev) => prev.filter((r) => r.id !== reactionId))
    }, 2500)
  }

  const meetingData = {
    title: `${customName}'s Meeting`,
    meetingId: id || '849 2039 1042',
    passcode: '982341',
    hostId: 'Host-9921',
  }

  const handleConfirmExit = () => {
    setLeaveModalOpen(false)
    addHistoryEntry({
      title: meetingData.title,
      meetingId: meetingData.meetingId,
      host: customName,
      participantsCount: participantsList.length,
      duration: 30,
    })
    navigate('/app')
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden select-none font-sans transition-colors ${
      isLightMode ? 'bg-[#f0f7f3] text-slate-900' : 'bg-[#06120d] text-white'
    }`}>
      {/* Top Header Bar */}
      <div className={`flex items-center justify-between px-4 py-2 shrink-0 text-xs border-b transition-colors ${
        isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d1f17] border-white/10'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-500 text-ink-950 font-bold text-[10px]">
              MS
            </span>
            <span className={isLightMode ? 'text-slate-900 font-extrabold' : 'text-slate-200'}>
              MeetSphere
            </span>
          </div>

          <button
            onClick={() => setInfoModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              isLightMode
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Info size={14} className="text-brand-500" />
            <span className="font-semibold truncate max-w-[200px]">{meetingData.title}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button in Room Top Bar */}
          <button
            onClick={toggleRoomTheme}
            className={`p-1.5 rounded-md transition-colors ${
              isLightMode ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button className={`p-1.5 rounded-md transition-colors ${
            isLightMode ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
          }`}>
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
              } else {
                document.exitFullscreen()
              }
            }}
            className={`p-1.5 rounded-md transition-colors ${
              isLightMode ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Screen Sharing Active Banner */}
      {isSharing && (
        <div className="bg-brand-500 text-ink-950 px-4 py-1.5 text-xs flex items-center justify-between font-bold z-20 shadow-md">
          <div className="flex items-center gap-2">
            <ScreenShare size={16} className="animate-pulse" />
            <span>You are sharing screen</span>
          </div>
          <button
            onClick={handleToggleShare}
            className="bg-black/20 hover:bg-black/40 text-black font-extrabold px-3 py-0.5 rounded text-xs transition-colors"
          >
            Stop Share
          </button>
        </div>
      )}

      {/* Main Room Body Container */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Main Stage Video Area */}
        <div className="flex-1 flex flex-col min-w-0 p-4 relative overflow-y-auto">
          {/* Floating Emoji Reactions Overlay */}
          <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            {activeReactions.map((r) => (
              <div
                key={r.id}
                style={{ left: `${r.left}%` }}
                className="absolute bottom-10 text-4xl animate-bounce transition-all duration-1000 opacity-90 drop-shadow-xl"
              >
                {r.emoji}
              </div>
            ))}
          </div>

          {/* Screen Share Stage or Grid Stage */}
          {isSharing ? (
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex-1 bg-black rounded-2xl border border-brand-500/30 overflow-hidden relative flex items-center justify-center shadow-2xl">
                {screenStream ? (
                  <video
                    ref={screenVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ScreenShare size={48} className="text-brand-400 animate-bounce" />
                    <p className="text-sm font-medium">Screen Share Stream Active</p>
                  </div>
                )}
              </div>
              {/* Thumbnail row for participants */}
              <div className="h-28 flex items-center justify-center gap-3 overflow-x-auto py-1">
                {participantsList.map((p) => (
                  <div key={p.id} className="w-40 shrink-0">
                    <ParticipantTile participant={p} mediaStream={mediaStream} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
                {participantsList.map((p) => (
                  <ParticipantTile key={p.id} participant={p} mediaStream={mediaStream} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Drawer Side Panel */}
        {chatOpen && (
          <div className={`w-full max-w-xs border-l flex flex-col z-30 shadow-2xl transition-colors ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#121216] border-white/10'
          }`}>
            <ChatPanel
              messages={messages}
              onSend={handleSendMessage}
              onClose={() => setChatOpen(false)}
              currentUserName={customName}
            />
          </div>
        )}
      </div>

      {/* Bottom Taskbar */}
      <MeetingControls
        muted={muted}
        camOn={camOn}
        chatOpen={chatOpen}
        isSharing={isSharing}
        participantCount={participantsList.length}
        onToggleMute={() => setMuted((v) => !v)}
        onToggleCam={() => setCamOn((v) => !v)}
        onToggleChat={() => setChatOpen((v) => !v)}
        onToggleShare={handleToggleShare}
        onOpenParticipants={() => setParticipantsModalOpen(true)}
        onOpenMeetingInfo={() => setInfoModalOpen(true)}
        onTriggerReaction={handleTriggerReaction}
        onLeave={() => setLeaveModalOpen(true)}
      />

      {/* Modals */}
      <MeetingInfoModal
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        meetingData={meetingData}
      />

      <ParticipantsModal
        open={participantsModalOpen}
        onClose={() => setParticipantsModalOpen(false)}
        participants={participantsList}
        meetingId={meetingData.meetingId}
      />

      <LeaveMeetingModal
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        onLeave={handleConfirmExit}
        onEndAll={handleConfirmExit}
      />
    </div>
  )
}
