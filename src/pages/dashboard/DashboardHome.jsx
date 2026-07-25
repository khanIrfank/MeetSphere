import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, Plus, CalendarClock, ScreenShare, History, Calendar, Sparkles, Users, ShieldCheck, Monitor } from 'lucide-react'
import { useMeetings } from '../../context/MeetingsContext'
import { useAuth } from '../../context/AuthContext'

import ScheduleModal from '../../components/meeting/ScheduleModal'
import NewMeetingPreviewModal from '../../components/modals/NewMeetingPreviewModal'
import JoinMeetingModal from '../../components/modals/JoinMeetingModal'
import ShareScreenModal from '../../components/modals/ShareScreenModal'

const quickActions = [
  { key: 'new', icon: Video, label: 'New meeting' },
  { key: 'join', icon: Plus, label: 'Join' },
  { key: 'schedule', icon: CalendarClock, label: 'Schedule' },
  { key: 'share', icon: ScreenShare, label: 'Share Screen' },
]

export default function DashboardHome() {
  const [now, setNow] = useState(new Date())
  const [activeTab, setActiveTab] = useState('scheduled') // 'scheduled' | 'history'

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [newMeetingModalOpen, setNewMeetingModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedMeetingId, setSelectedMeetingId] = useState(null)

  const { meetings, meetingHistory, addMeeting } = useMeetings()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleAction = (key) => {
    if (key === 'new') {
      setSelectedMeetingId(Date.now().toString())
      setNewMeetingModalOpen(true)
    } else if (key === 'join') {
      setJoinModalOpen(true)
    } else if (key === 'schedule') {
      setScheduleModalOpen(true)
    } else if (key === 'share') {
      setShareModalOpen(true)
    }
  }

  const handleStartNewMeeting = (config) => {
    setNewMeetingModalOpen(false)
    const targetId = selectedMeetingId || Date.now().toString()
    const query = new URLSearchParams({
      muted: config.audioMuted ? 'true' : 'false',
      videoOff: config.videoOff ? 'true' : 'false',
    }).toString()
    navigate(`/app/room/${targetId}?${query}`)
  }

  const handleJoinMeeting = (data) => {
    setJoinModalOpen(false)
    const cleanId = data.meetingId.replace(/\s+/g, '')
    const query = new URLSearchParams({
      name: data.name,
      muted: data.dontConnectAudio ? 'true' : 'false',
      videoOff: data.turnOffVideo ? 'true' : 'false',
    }).toString()
    navigate(`/app/room/${cleanId}?${query}`)
  }

  const handleShareScreen = (meetingId) => {
    setShareModalOpen(false)
    const cleanId = meetingId.replace(/\s+/g, '')
    navigate(`/app/room/${cleanId}?screenshare=true`)
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-3.5 max-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-brand-500/25 bg-gradient-to-r from-brand-500/10 via-elevated to-surface p-4 sm:p-5 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center shrink-0">
        {/* Left Side: Time, Date & Greeting */}
        <div className="flex flex-col items-start justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-600 font-extrabold text-[10px] sm:text-[11px] mb-1.5 border border-brand-500/20">
            <Sparkles size={12} />
            <span>MeetSphere Live</span>
          </span>
          <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight tabular-nums text-theme-heading drop-shadow-sm leading-none">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-[11px] sm:text-sm font-bold text-theme-body mt-1">
            {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[11px] font-semibold text-theme-sub mt-0.5">
            Welcome back, <span className="font-extrabold text-brand-600 dark:text-brand-400">{user?.name || 'User'}</span>
          </p>
        </div>

        {/* Center: Feature Banner */}
        <div className="hidden sm:flex flex-col items-center justify-center text-center px-2 py-1">
          <div className="flex items-center justify-center gap-3 bg-surface/70 border border-soft p-2.5 sm:p-3 rounded-2xl shadow-inner w-full">
            <div className="p-2 sm:p-2.5 rounded-xl bg-brand-500/15 text-brand-500 shrink-0">
              <Monitor size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-theme-heading">HD Video & Screen Share</p>
              <p className="text-[10px] font-semibold text-theme-sub">Secure End-to-End Encrypted</p>
            </div>
          </div>
        </div>

        {/* Right Side: Big Video Button Widget */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center bg-elevated border border-brand-500/30 p-3 sm:p-4 rounded-2xl shadow-md gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/30 shrink-0">
            <Video size={20} strokeWidth={2.5} />
          </div>
          <button
            onClick={() => handleAction('new')}
            className="flex-1 md:w-full py-2 px-3 bg-brand-500 hover:bg-brand-400 text-ink-950 text-xs font-extrabold rounded-xl shadow transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Start Instant Meeting
          </button>
        </div>
      </div>

      {/* Action Quick Grid (4 icons) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto shrink-0 w-full">
        {quickActions.map((a) => (
          <button
            key={a.key}
            onClick={() => handleAction(a.key)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-ink-950 transition-all shadow-md group-hover:scale-105">
              <a.icon size={18} className="sm:w-5 sm:h-5" />
            </span>
            <span className="text-[11px] sm:text-xs text-theme-heading font-extrabold group-hover:text-brand-600 transition-colors whitespace-nowrap">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Meetings Card with Responsive Scrollable Tabs */}
      <div className="rounded-2xl sm:rounded-3xl border border-soft bg-elevated shadow-xl overflow-hidden flex-1 flex flex-col min-h-0">
        {/* Tab Header Bar (Fix: Clean non-wrapping responsive tabs for small mobile screens) */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-soft bg-surface/50 shrink-0 gap-1.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'scheduled'
                  ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
                  : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
              }`}
            >
              <Calendar size={13} />
              <span className="hidden sm:inline">Scheduled Meetings ({meetings.length})</span>
              <span className="sm:hidden">Scheduled ({meetings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
                  : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
              }`}
            >
              <History size={13} />
              <span className="hidden sm:inline">Meeting History ({meetingHistory.length})</span>
              <span className="sm:hidden">History ({meetingHistory.length})</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/app/meetings')}
            className="text-[11px] sm:text-xs text-brand-600 font-extrabold hover:underline whitespace-nowrap shrink-0 ml-1 cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Tab Content Container with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-custom p-2 min-h-0">
          {activeTab === 'scheduled' ? (
            <div>
              {meetings.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs font-bold text-theme-sub">
                  Nothing scheduled right now. Click &quot;Schedule&quot; to plan a meeting.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--border-soft)]">
                  {meetings.map((m) => (
                    <li key={m.id} className="flex items-center justify-between px-3 sm:px-4 py-2.5 hover:bg-surface/60 rounded-xl transition-colors gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-extrabold text-theme-heading truncate">{m.title}</p>
                        <p className="text-[11px] sm:text-xs font-semibold text-theme-body mt-0.5 truncate">
                          {new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {m.time} · {m.duration}m
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono font-medium text-theme-sub mt-0.5 truncate">ID: {m.meetingId} · Passcode: {m.passcode}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeetingId(m.id)
                          setNewMeetingModalOpen(true)
                        }}
                        className="text-[11px] sm:text-xs font-extrabold rounded-full bg-brand-500 hover:bg-brand-400 text-ink-950 px-3.5 py-1 sm:px-4 sm:py-1.5 shadow transition-all hover:scale-105 shrink-0 cursor-pointer"
                      >
                        Start
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              {meetingHistory.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs font-bold text-theme-sub">
                  No past meeting history recorded yet.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--border-soft)]">
                  {meetingHistory.map((h) => (
                    <li key={h.id} className="flex items-center justify-between px-3 sm:px-4 py-2.5 hover:bg-surface/60 rounded-xl transition-colors gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-extrabold text-theme-heading truncate">{h.title}</p>
                          <span className="text-[9px] bg-brand-500/15 text-brand-600 font-extrabold px-1.5 py-0.2 rounded-full border border-brand-500/30 shrink-0">
                            {h.status}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs font-semibold text-theme-body mt-0.5 truncate">
                          Ended {new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {h.time}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono font-medium text-theme-sub mt-0.5 truncate">ID: {h.meetingId} · {h.participantsCount} participants</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeetingId(h.meetingId.replace(/\s+/g, ''))
                          setNewMeetingModalOpen(true)
                        }}
                        className="text-[11px] sm:text-xs font-extrabold rounded-full border border-brand-500/40 hover:bg-brand-500 hover:text-ink-950 text-theme-heading px-3 py-1 transition-all shadow-sm shrink-0 cursor-pointer"
                      >
                        Rejoin
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <NewMeetingPreviewModal
        open={newMeetingModalOpen}
        onClose={() => setNewMeetingModalOpen(false)}
        onStart={handleStartNewMeeting}
        userName={user?.name || 'Irfan Khan'}
      />

      <JoinMeetingModal
        open={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onJoin={handleJoinMeeting}
        defaultName={user?.name || 'Irfan Khan'}
      />

      <ShareScreenModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onShare={handleShareScreen}
      />

      <ScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onCreate={(data) => { addMeeting(data); setScheduleModalOpen(false) }}
      />
    </div>
  )
}
