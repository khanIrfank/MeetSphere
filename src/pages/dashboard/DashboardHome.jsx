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
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-4 max-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Hero Banner: Left Time & Greeting | Center Vector Illustration | Right Big Video Widget */}
      <div className="rounded-3xl border border-brand-500/25 bg-gradient-to-r from-brand-500/10 via-elevated to-surface p-5 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 items-center shrink-0">
        {/* Left Side: Time, Date & Greeting */}
        <div className="flex flex-col items-start justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 text-brand-600 font-bold text-[11px] mb-2 border border-brand-500/20">
            <Sparkles size={13} />
            <span>MeetSphere Live</span>
          </span>
          <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums text-theme-heading drop-shadow-sm">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs sm:text-sm font-bold text-theme-body mt-1">
            {now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-xs font-semibold text-theme-sub mt-0.5">
            Welcome back, <span className="font-extrabold text-brand-600 dark:text-brand-400">{user?.name || 'User'}</span>.
          </p>
        </div>

        {/* Center: Website Feature Illustration Banner */}
        <div className="flex flex-col items-center justify-center text-center px-2 py-1">
          <div className="flex items-center justify-center gap-3 bg-surface/70 border border-soft p-3 rounded-2xl shadow-inner w-full">
            <div className="p-2.5 rounded-xl bg-brand-500/15 text-brand-500">
              <Monitor size={22} />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-theme-heading">HD Video & Screen Share</p>
              <p className="text-[11px] font-semibold text-theme-sub">Secure End-to-End Encrypted</p>
            </div>
          </div>
        </div>

        {/* Right Side: Big Video Icon Widget */}
        <div className="flex flex-col items-center justify-center bg-elevated border border-brand-500/30 p-4 rounded-2xl shadow-md hover:border-brand-500/50 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/30 mb-2 animate-pulse">
            <Video size={24} strokeWidth={2.5} />
          </div>
          <button
            onClick={() => handleAction('new')}
            className="w-full py-2 bg-brand-500 hover:bg-brand-400 text-ink-950 text-xs font-extrabold rounded-xl shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Start Instant Meeting
          </button>
        </div>
      </div>

      {/* Action Quick Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto shrink-0">
        {quickActions.map((a) => (
          <button
            key={a.key}
            onClick={() => handleAction(a.key)}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-ink-950 transition-all shadow-md group-hover:scale-105">
              <a.icon size={20} />
            </span>
            <span className="text-xs text-theme-heading font-extrabold group-hover:text-brand-600 transition-colors">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Meetings Card with Fixed Height & Scrollbar */}
      <div className="rounded-3xl border border-soft bg-elevated shadow-xl overflow-hidden flex-1 flex flex-col min-h-0">
        {/* Tab Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-soft bg-surface/50 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'scheduled'
                  ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
                  : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
              }`}
            >
              <Calendar size={14} />
              <span>Scheduled Meetings ({meetings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'history'
                  ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
                  : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
              }`}
            >
              <History size={14} />
              <span>Meeting History ({meetingHistory.length})</span>
            </button>
          </div>

          <button onClick={() => navigate('/app/meetings')} className="text-xs text-brand-600 font-extrabold hover:underline">
            View all
          </button>
        </div>

        {/* Tab Content Container with Scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-custom p-2 min-h-0">
          {activeTab === 'scheduled' ? (
            <div>
              {meetings.length === 0 ? (
                <div className="px-6 py-8 text-center text-xs font-bold text-theme-sub">
                  Nothing scheduled right now. Click &quot;Schedule&quot; to plan a meeting.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--border-soft)]">
                  {meetings.map((m) => (
                    <li key={m.id} className="flex items-center justify-between px-4 py-3 hover:bg-surface/60 rounded-xl transition-colors">
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-theme-heading">{m.title}</p>
                        <p className="text-xs font-semibold text-theme-body mt-0.5">
                          {new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {m.time} · {m.duration} mins · Host: <span className="font-extrabold text-brand-600">{m.host}</span>
                        </p>
                        <p className="text-[11px] font-mono font-medium text-theme-sub mt-0.5">ID: {m.meetingId} · Passcode: {m.passcode}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeetingId(m.id)
                          setNewMeetingModalOpen(true)
                        }}
                        className="text-xs font-extrabold rounded-full bg-brand-500 hover:bg-brand-400 text-ink-950 px-4 py-1.5 shadow transition-all hover:scale-105 shrink-0 ml-3 cursor-pointer"
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
                <div className="px-6 py-8 text-center text-xs font-bold text-theme-sub">
                  No past meeting history recorded yet.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--border-soft)]">
                  {meetingHistory.map((h) => (
                    <li key={h.id} className="flex items-center justify-between px-4 py-3 hover:bg-surface/60 rounded-xl transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-extrabold text-theme-heading">{h.title}</p>
                          <span className="text-[10px] bg-brand-500/15 text-brand-600 font-extrabold px-2 py-0.5 rounded-full border border-brand-500/30">
                            {h.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-theme-body mt-0.5">
                          Ended on {new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {h.time} · Host: {h.host}
                        </p>
                        <p className="text-[11px] font-mono font-medium text-theme-sub mt-0.5">Meeting ID: {h.meetingId} · {h.participantsCount} participants</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeetingId(h.meetingId.replace(/\s+/g, ''))
                          setNewMeetingModalOpen(true)
                        }}
                        className="text-xs font-extrabold rounded-full border border-brand-500/40 hover:bg-brand-500 hover:text-ink-950 text-theme-heading px-3.5 py-1 transition-all shadow-sm shrink-0 ml-3 cursor-pointer"
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
