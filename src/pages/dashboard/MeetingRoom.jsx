import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Info,
  ShieldCheck,
  Maximize2,
  ScreenShare,
  Moon,
  Sun,
  Users,
  MessageSquare,
  Search,
  Mic,
  MicOff,
  Send,
  X,
  Hash,
  Crown,
  Pin
} from 'lucide-react'

import Avatar from '../../components/common/Avatar'
import ParticipantTile from '../../components/meeting/ParticipantTile'
import MeetingControls from '../../components/meeting/MeetingControls'
import MeetingInfoModal from '../../components/modals/MeetingInfoModal'
import LeaveMeetingModal from '../../components/modals/LeaveMeetingModal'

import { generateMockParticipantsList, mockChatMessages } from '../../data/meetings'
import { useAuth } from '../../context/AuthContext'
import { useMeetings } from '../../context/MeetingsContext'
import { usePlan } from '../../context/PlanContext'

export default function MeetingRoom() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addHistoryEntry } = useMeetings()
  const { activePlan } = usePlan()

  // Theme state
  const [isLightMode, setIsLightMode] = useState(() => {
    return document.documentElement.classList.contains('theme-light')
  })

  // Query params
  const initialMuted = searchParams.get('muted') === 'true'
  const initialVideoOff = searchParams.get('videoOff') === 'true'
  const customName = searchParams.get('name') || user?.name || 'Irfan Khan'

  // Plan limits
  const maxCapacity = activePlan?.maxUsers || 500
  const maxHostsLimit = activePlan?.maxHosts || 4

  // Participant Count State (Default 1 participant for new meetings!)
  const initialCountParam = searchParams.get('count') ? Number(searchParams.get('count')) : 1
  const [simulatedCount, setSimulatedCount] = useState(initialCountParam)

  // Participants State List (generated with muted: true by default)
  const [participantsList, setParticipantsList] = useState(() => {
    return generateMockParticipantsList(simulatedCount, customName)
  })

  // Whenever testing count changes, generate new participants list
  useEffect(() => {
    setParticipantsList(generateMockParticipantsList(simulatedCount, customName))
  }, [simulatedCount, customName])

  // Handler to switch testing layout count on the fly
  const handleSelectTestingCount = (cnt) => {
    setSimulatedCount(cnt)
    setParticipantsList(generateMockParticipantsList(cnt, customName))
  }

  // Room states
  const [muted, setMuted] = useState(initialMuted)
  const [camOn, setCamOn] = useState(!initialVideoOff)
  const [facingMode, setFacingMode] = useState('user')

  // Side Panel Collapsible States (By default Users Panel is CLOSED when meeting is created!)
  const [usersPanelOpen, setUsersPanelOpen] = useState(false) // Right Users Panel CLOSED by default!
  const [chatPanelOpen, setChatPanelOpen] = useState(false)  // Far Right Chat Panel CLOSED by default!

  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [messages, setMessages] = useState(mockChatMessages)
  const [chatInputText, setChatInputText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Screen Share State
  const [isSharing, setIsSharing] = useState(false)
  const [screenStream, setScreenStream] = useState(null)

  // Media Streams & Refs
  const [mediaStream, setMediaStream] = useState(null)
  const screenVideoRef = useRef(null)
  const screenCanvasRef = useRef(null)
  const chatEndRef = useRef(null)

  // Auto-scroll chat panel to bottom on new message or panel open
  useEffect(() => {
    if (chatPanelOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, chatPanelOpen])

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

  // Intercept browser back button
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

  // Sync Host self details
  useEffect(() => {
    setParticipantsList((prev) =>
      prev.map((p) => (p.isSelf ? { ...p, name: customName, muted, camOn } : p))
    )
  }, [customName, muted, camOn])

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

  const handleToggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }

  // Native Browser Screen Sharing Handler
  const handleToggleShareScreen = async () => {
    if (isSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach((t) => t.stop())
      }
      setScreenStream(null)
      setIsSharing(false)
    } else {
      if (navigator.mediaDevices?.getDisplayMedia) {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { cursor: 'always' },
            audio: false,
          })
          setScreenStream(stream)
          setIsSharing(true)

          stream.getVideoTracks()[0].onended = () => {
            setScreenStream(null)
            setIsSharing(false)
          }
          return
        } catch (err) {
          console.log('Native screen share cancelled or fallback mode:', err)
          if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
            return
          }
        }
      }
      setIsSharing(true)
    }
  }

  // Attach native screen share stream to video element
  useEffect(() => {
    if (screenStream && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStream
      screenVideoRef.current.play().catch(() => {})
    }
  }, [screenStream, isSharing])

  // Live Presentation Deck Canvas Stream (Fallback when screenStream is null)
  useEffect(() => {
    let animId = null
    if (isSharing && !screenStream && screenCanvasRef.current) {
      const canvas = screenCanvasRef.current
      canvas.width = 1280
      canvas.height = 720
      const ctx = canvas.getContext('2d')
      let frame = 0

      const draw = () => {
        if (!ctx) return
        frame += 0.04

        ctx.fillStyle = '#050b08'
        ctx.fillRect(0, 0, 1280, 720)

        ctx.fillStyle = '#0a1711'
        ctx.strokeStyle = '#10b981'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.roundRect(50, 40, 1180, 640, 24)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText('📊 Live Presentation Deck & Dashboard', 90, 110)

        ctx.fillStyle = '#cbd5e1'
        ctx.font = '20px sans-serif'
        ctx.fillText(`Presenter: ${customName} (Main Host) • Broadcasting to ${participantsList.length.toLocaleString()} Live Viewers`, 90, 155)

        ctx.fillStyle = '#11261c'
        ctx.strokeStyle = '#059669'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(90, 190, 320, 120, 16)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#94a3b8'
        ctx.font = 'bold 14px sans-serif'
        ctx.fillText('STREAM QUALITY', 110, 225)
        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('1080p HD • 60 FPS', 110, 270)

        ctx.fillStyle = '#11261c'
        ctx.beginPath()
        ctx.roundRect(440, 190, 320, 120, 16)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#94a3b8'
        ctx.font = 'bold 14px sans-serif'
        ctx.fillText('CONNECTED ROOM USERS', 460, 225)
        ctx.fillStyle = '#34d399'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText(`${participantsList.length.toLocaleString()} Participants`, 460, 270)

        ctx.fillStyle = '#94a3b8'
        ctx.font = 'bold 16px sans-serif'
        ctx.fillText('REAL-TIME ANALYTICS PERFORMANCE', 90, 360)

        for (let i = 0; i < 9; i++) {
          const barH = 140 + Math.sin(frame + i * 0.7) * 90
          ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#34d399'
          ctx.beginPath()
          ctx.roundRect(90 + i * 125, 620 - barH, 85, barH, 8)
          ctx.fill()
        }

        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.arc(1170, 105, 9, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 16px sans-serif'
        ctx.fillText('LIVE STREAMING', 1020, 111)

        animId = requestAnimationFrame(draw)
      }

      draw()
    }

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [isSharing, screenStream, customName, participantsList.length])

  // Participant Actions & Mic Unmute Toggle
  const handleToggleParticipantMic = (participantId) => {
    setParticipantsList((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, muted: !p.muted } : p))
    )
  }

  const handleToggleParticipantCam = (participantId) => {
    setParticipantsList((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, camOn: !p.camOn } : p))
    )
  }

  const handleToggleCoHost = (participantId) => {
    const currentCoHostsCount = participantsList.filter((p) => (p.isCoHost || p.isHost) && !p.isSelf).length

    setParticipantsList((prev) =>
      prev.map((p) => {
        if (p.id === participantId) {
          if (!p.isCoHost && currentCoHostsCount >= maxHostsLimit - 1) {
            alert(`Your ${activePlan?.name || 'Current Plan'} allows maximum ${maxHostsLimit} Co-Hosts.`)
            return p
          }
          return { ...p, isCoHost: !p.isCoHost }
        }
        return p
      })
    )
  }

  const handleMuteAll = () => {
    setParticipantsList((prev) =>
      prev.map((p) => (p.isSelf ? p : { ...p, muted: true }))
    )
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!chatInputText.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: customName,
        text: chatInputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setChatInputText('')
  }

  // 1. HOSTS & CO-HOSTS LIST (Main Host + Co-Hosts)
  const hostsAndCoHostsList = participantsList.filter((p) => p.isHost || p.isCoHost || p.isSelf)

  // 2. REGULAR USERS LIST ONLY (Excludes Hosts & Co-Hosts)
  const regularUsersList = participantsList.filter((p) => !p.isHost && !p.isCoHost && !p.isSelf)

  // DYNAMIC SORTING FOR REGULAR USERS PANEL: Unmuted users (mic open) automatically sort to VERY TOP with Pin badge!
  const sortedRegularUsers = [...regularUsersList].sort((a, b) => {
    const aPinned = !a.muted
    const bPinned = !b.muted
    if (aPinned && !bPinned) return -1
    if (!aPinned && bPinned) return 1
    return 0
  })

  // Filter sorted regular users by search query
  const filteredRegularUsers = sortedRegularUsers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCoHostsCount = participantsList.filter((p) => p.isCoHost || p.isHost).length

  const meetingData = {
    title: `${customName}'s Meeting Room`,
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

  // Evaluate dynamic padding based on how many side panels are open
  const isMultiPanelOpen = usersPanelOpen && chatPanelOpen
  const isAnyPanelOpen = usersPanelOpen || chatPanelOpen

  return (
    <div className={`flex flex-col h-screen overflow-hidden select-none font-sans transition-colors ${
      isLightMode ? 'bg-[#f0f7f3] text-slate-900' : 'bg-[#060c09] text-white'
    }`}>
      {/* TOP HEADER BAR */}
      <div className={`flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 shrink-0 text-xs border-b transition-colors z-20 ${
        isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b1611] border-white/10'
      }`}>
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 font-bold shrink-0">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-500 text-ink-950 font-extrabold text-xs">
              MS
            </span>
            <span className="hidden sm:inline font-extrabold text-sm text-theme-heading">
              MeetSphere Live
            </span>
          </div>

          <button
            onClick={() => setInfoModalOpen(true)}
            className={`flex items-center gap-1 px-2 py-1 rounded-xl transition-colors min-w-0 ${
              isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Info size={13} className="text-brand-500 shrink-0" />
            <span className="font-semibold text-[11px] sm:text-xs truncate max-w-[100px] sm:max-w-[220px]">{meetingData.title}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Active Participants Count Badge */}
          <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 font-extrabold text-xs border border-brand-500/30">
            <Users size={13} />
            <span>{participantsList.length.toLocaleString()} Live Users</span>
          </span>

          {/* Quick Testing Count Selector Pill in Top Bar */}
          <div className="flex items-center gap-1 bg-surface border border-brand-500/40 rounded-xl px-1.5 sm:px-2 py-0.5 shadow-sm">
            <Hash size={11} className="text-brand-400" />
            <select
              value={simulatedCount}
              onChange={(e) => handleSelectTestingCount(Number(e.target.value))}
              className="bg-transparent text-[10px] sm:text-[11px] font-extrabold text-brand-400 outline-none cursor-pointer"
            >
              <option value={1} className="bg-[#0b1611]">1 User</option>
              <option value={2} className="bg-[#0b1611]">2 Users</option>
              <option value={4} className="bg-[#0b1611]">4 Users</option>
              <option value={10} className="bg-[#0b1611]">10 Users</option>
              <option value={50} className="bg-[#0b1611]">50 Users</option>
              <option value={100} className="bg-[#0b1611]">100 Users</option>
              <option value={500} className="bg-[#0b1611]">500 Users</option>
              <option value={1000} className="bg-[#0b1611]">1,000 Users</option>
            </select>
          </div>

          <button
            onClick={toggleRoomTheme}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
              isLightMode ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <button
            onClick={() => setLeaveModalOpen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[11px] sm:text-xs font-extrabold rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <X size={14} />
            <span className="hidden sm:inline">Leave Room</span>
          </button>
        </div>
      </div>

      {/* MOBILE BACKDROP OVERLAY FOR SLIDE-OVER PANELS */}
      {isAnyPanelOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 sm:hidden backdrop-blur-xs"
          onClick={() => {
            setUsersPanelOpen(false)
            setChatPanelOpen(false)
          }}
        />
      )}

      {/* MAIN MEETING WORKSPACE CONTAINER */}
      <div className={`flex-1 flex min-h-0 relative overflow-hidden transition-all duration-300 ${
        isMultiPanelOpen
          ? 'p-2 sm:px-3 py-2 gap-2.5'
          : isAnyPanelOpen
          ? 'p-2 sm:px-5 py-2.5 gap-3'
          : 'p-2.5 sm:px-8 py-3 gap-4'
      }`}>

        {/* 1. LEFT MAIN STAGE (Screen Share Stage OR Large Prominent Hosts & Co-Hosts Stage!) */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative items-center justify-center w-full">
          <div className="flex-1 flex flex-col gap-2.5 sm:gap-3 min-h-0 w-full">
            <div className="flex-1 bg-[#06120c] rounded-2xl sm:rounded-3xl border border-brand-500/30 overflow-hidden relative flex items-center justify-center shadow-2xl min-h-0 p-2 sm:p-3">
              {isSharing ? (
                /* LIVE SCREEN SHARE DISPLAY (Displays actual screen video stream or animated live deck!) */
                <div className="w-full h-full relative flex items-center justify-center bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  {screenStream ? (
                    <video
                      ref={screenVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <canvas ref={screenCanvasRef} className="w-full h-full object-contain" />
                  )}

                  {/* Top Overlay Badge & Controls */}
                  <div className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Live Screen Share ({participantsList.length.toLocaleString()} Viewers)
                    </span>
                  </div>

                  <button
                    onClick={handleToggleShareScreen}
                    className="absolute top-3 right-3 z-30 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <X size={14} />
                    <span>Stop Sharing</span>
                  </button>
                </div>
              ) : (
                /* SCREEN SHARE OFF: PROMINENT LARGE HOSTS & CO-HOSTS STAGE */
                <div className="w-full h-full flex flex-col min-h-0">
                  <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10 shrink-0 mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Crown size={16} className="text-brand-400 shrink-0" />
                      <span className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider truncate">
                        Hosts & Co-Hosts Stage ({hostsAndCoHostsList.length})
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full border border-brand-500/30 shrink-0">
                      {activeCoHostsCount} / {maxHostsLimit} Co-Hosts
                    </span>
                  </div>

                  {/* Large Prominent Video Tiles Grid for Hosts & Co-Hosts */}
                  <div className={`grid gap-2 sm:gap-3 flex-1 min-h-0 w-full overflow-y-auto ${
                    hostsAndCoHostsList.length === 1
                      ? 'grid-cols-1 grid-rows-1 max-w-4xl mx-auto'
                      : hostsAndCoHostsList.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : hostsAndCoHostsList.length <= 4
                      ? 'grid-cols-2 grid-rows-2'
                      : 'grid-cols-2 sm:grid-cols-3'
                  }`}>
                    {hostsAndCoHostsList.map((h) => (
                      <div key={h.id} className="h-full w-full">
                        <ParticipantTile
                          participant={h}
                          mediaStream={mediaStream}
                          facingMode={facingMode}
                          isCurrentHost={true}
                          onToggleParticipantMic={handleToggleParticipantMic}
                          onToggleParticipantCam={handleToggleParticipantCam}
                          onToggleCoHost={handleToggleCoHost}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AUTOMATIC BOTTOM HORIZONTAL HOSTS RIBBON (When Screen Share is ON!) */}
            {isSharing && (
              <div className="h-24 sm:h-32 flex items-center justify-start gap-2 overflow-x-auto px-3 py-2 shrink-0 scrollbar-none w-full border-t border-brand-500/30 bg-[#0a1610] rounded-2xl shadow-xl">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-brand-400 uppercase tracking-wider shrink-0 mr-1">
                  <ShieldCheck size={15} />
                  <span>Hosts ({hostsAndCoHostsList.length}):</span>
                </div>
                {hostsAndCoHostsList.map((h) => (
                  <div key={h.id} className="w-32 sm:w-44 shrink-0 h-full">
                    <ParticipantTile
                      participant={h}
                      mediaStream={mediaStream}
                      facingMode={facingMode}
                      isCurrentHost={true}
                      onToggleParticipantMic={handleToggleParticipantMic}
                      onToggleParticipantCam={handleToggleParticipantCam}
                      onToggleCoHost={handleToggleCoHost}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. RIGHT USERS PANEL (SLIDE-OVER ON MOBILE, SIDE PANEL ON DESKTOP!) */}
        {usersPanelOpen && (
          <div className="fixed sm:relative inset-y-0 right-0 z-50 sm:z-30 w-full sm:w-[320px] lg:w-[340px] flex flex-col gap-3 shrink-0 rounded-l-3xl sm:rounded-3xl border border-white/10 bg-[#0e131b] p-3.5 shadow-2xl animate-fade-left min-h-0 overflow-x-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
              <div>
                <h2 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Users size={16} className="text-brand-400" />
                  <span>Users Panel ({regularUsersList.length.toLocaleString()})</span>
                </h2>
                <p className="text-[10px] text-slate-400 font-medium">Regular Users Video Boxes</p>
              </div>
              <button onClick={() => setUsersPanelOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/40 border border-white/15 text-xs shrink-0">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 font-medium text-xs"
              />
            </div>

            {/* 2-COLUMN PARTICIPANT VIDEO GRID (CONTAINING REGULAR USERS ONLY! UNMUTED USERS SORTED TO TOP WITH PIN BADGE!) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-0.5 scrollbar-thin min-h-0 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {filteredRegularUsers.map((p) => {
                  const isUnmutedPinned = !p.muted
                  return (
                    <div key={p.id} className="relative h-32 sm:h-36 w-full group">
                      {/* Pinned Active Mic Badge on top right of video box */}
                      {isUnmutedPinned && (
                        <div className="absolute top-2 right-2 z-40 bg-emerald-500 text-ink-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-0.5 animate-pulse">
                          <Pin size={10} className="rotate-45" />
                          <span>Pinned</span>
                        </div>
                      )}

                      <ParticipantTile
                        participant={p}
                        mediaStream={mediaStream}
                        facingMode={facingMode}
                        isCurrentHost={true}
                        onToggleParticipantMic={handleToggleParticipantMic}
                        onToggleParticipantCam={handleToggleParticipantCam}
                        onToggleCoHost={handleToggleCoHost}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. FAR RIGHT CHAT PANEL (SLIDE-OVER ON MOBILE, SIDE PANEL ON DESKTOP!) */}
        {chatPanelOpen && (
          <div className="fixed sm:relative inset-y-0 right-0 z-50 sm:z-30 w-full sm:w-[300px] lg:w-[320px] flex flex-col gap-3 shrink-0 rounded-l-3xl sm:rounded-3xl border border-white/10 bg-[#0d1017] p-4 shadow-2xl animate-fade-left min-h-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <div>
                <h2 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MessageSquare size={16} className="text-brand-400" />
                  <span>Chat Panel</span>
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">In-Meeting Live Messages</p>
              </div>
              <button onClick={() => setChatPanelOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin min-h-0 pb-2">
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col items-start space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span className="font-extrabold text-slate-200">{m.author}</span>
                    <span>• {m.time}</span>
                  </div>
                  <div className="bg-surface/80 border border-white/10 p-2.5 rounded-2xl text-xs text-slate-200 font-medium leading-relaxed max-w-[95%]">
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} className="h-1" />
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-white/10 shrink-0">
              <input
                type="text"
                placeholder="Send message..."
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold transition-all cursor-pointer shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

      </div>

      {/* FIXED BOTTOM TASKBAR */}
      <MeetingControls
        muted={muted}
        camOn={camOn}
        facingMode={facingMode}
        chatOpen={chatPanelOpen}
        usersOpen={usersPanelOpen}
        isSharing={isSharing}
        participantCount={participantsList.length}
        onToggleMute={() => setMuted((v) => !v)}
        onToggleCam={() => setCamOn((v) => !v)}
        onToggleFacingMode={handleToggleFacingMode}
        onToggleChat={() => setChatPanelOpen((v) => !v)}
        onToggleParticipants={() => setUsersPanelOpen((v) => !v)}
        onToggleShare={handleToggleShareScreen}
        onOpenMeetingInfo={() => setInfoModalOpen(true)}
        onSelectTestingCount={handleSelectTestingCount}
        onLeave={() => setLeaveModalOpen(true)}
      />

      {/* Modals */}
      <MeetingInfoModal
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        meetingData={meetingData}
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
