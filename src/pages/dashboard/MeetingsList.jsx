import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Copy, CalendarClock, History, Calendar } from 'lucide-react'
import { useMeetings } from '../../context/MeetingsContext'
import { useAuth } from '../../context/AuthContext'
import ScheduleModal from '../../components/meeting/ScheduleModal'
import NewMeetingPreviewModal from '../../components/modals/NewMeetingPreviewModal'
import Button from '../../components/common/Button'

export default function MeetingsList() {
  const { meetings, meetingHistory, addMeeting, removeMeeting } = useMeetings()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('scheduled') // 'scheduled' | 'history'

  const [modalOpen, setModalOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedMeetingId, setSelectedMeetingId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const navigate = useNavigate()

  const handleCopy = (meeting) => {
    navigator.clipboard?.writeText(`Meeting ID: ${meeting.meetingId} · Passcode: ${meeting.passcode}`)
    setCopiedId(meeting.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const handleStartMeetingClick = (meetingId) => {
    setSelectedMeetingId(meetingId)
    setPreviewOpen(true)
  }

  const handleStartConfirm = (config) => {
    setPreviewOpen(false)
    const target = selectedMeetingId || 'm-1'
    const query = new URLSearchParams({
      muted: config.audioMuted ? 'true' : 'false',
      videoOff: config.videoOff ? 'true' : 'false',
    }).toString()
    navigate(`/app/room/${target}?${query}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 select-none">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-theme-heading">Meetings</h1>
          <p className="text-xs sm:text-sm font-semibold text-theme-sub mt-1">Manage scheduled meetings and view past meeting history.</p>
        </div>
        <Button icon={Plus} size="sm" onClick={() => setModalOpen(true)}>Schedule</Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-6 border-b border-soft pb-3">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'scheduled'
              ? 'bg-brand-500 text-ink-950 shadow-md'
              : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
          }`}
        >
          <Calendar size={15} />
          <span>Scheduled ({meetings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'history'
              ? 'bg-brand-500 text-ink-950 shadow-md'
              : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
          }`}
        >
          <History size={15} />
          <span>History ({meetingHistory.length})</span>
        </button>
      </div>

      {/* Scheduled Tab Content */}
      {activeTab === 'scheduled' && (
        <div className="max-h-[420px] overflow-y-auto scrollbar-custom pr-1.5">
          {meetings.length === 0 ? (
            <div className="rounded-2xl border border-soft bg-elevated py-16 text-center">
              <CalendarClock size={28} className="mx-auto text-muted mb-3" />
              <p className="text-sm font-semibold text-theme-sub">No scheduled meetings yet. Click Schedule to add one.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {meetings.map((m) => (
                <li key={m.id} className="rounded-2xl border border-soft bg-elevated p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md hover:border-brand-500/40 transition-all">
                  <div className="min-w-0">
                    <p className="font-extrabold text-theme-heading">{m.title}</p>
                    <p className="text-xs font-semibold text-theme-body mt-1">
                      {new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {m.time} · {m.duration} min · Host: <span className="font-bold text-brand-600">{m.host}</span>
                    </p>
                    <p className="text-xs font-mono font-medium text-theme-sub mt-1">ID: {m.meetingId} · Passcode: {m.passcode}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(m)}
                      className="flex items-center gap-1.5 text-xs font-bold text-theme-body hover:text-brand-600 rounded-full border border-soft px-3 py-1.5 hover:bg-surface transition-colors"
                    >
                      <Copy size={13} />
                      {copiedId === m.id ? 'Copied' : 'Copy invite'}
                    </button>
                    <button
                      onClick={() => removeMeeting(m.id)}
                      aria-label="Delete meeting"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-soft text-muted hover:text-rose-400 hover:border-rose-400/40 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Button size="sm" onClick={() => handleStartMeetingClick(m.id)}>Start</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* History Tab Content */}
      {activeTab === 'history' && (
        <div className="max-h-[420px] overflow-y-auto scrollbar-custom pr-1.5">
          {meetingHistory.length === 0 ? (
            <div className="rounded-2xl border border-soft bg-elevated py-16 text-center">
              <History size={28} className="mx-auto text-muted mb-3" />
              <p className="text-sm font-semibold text-theme-sub">No past meeting history found.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {meetingHistory.map((h) => (
                <li key={h.id} className="rounded-2xl border border-soft bg-elevated p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md hover:border-brand-500/40 transition-all">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-theme-heading">{h.title}</p>
                      <span className="text-[10px] bg-brand-500/15 text-brand-600 font-extrabold px-2.5 py-0.5 rounded-full border border-brand-500/30">
                        {h.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-theme-body mt-1">
                      Ended on {new Date(h.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {h.time} · Host: {h.host}
                    </p>
                    <p className="text-xs font-mono font-medium text-theme-sub mt-1">Meeting ID: {h.meetingId} · {h.participantsCount} participants</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartMeetingClick(h.meetingId.replace(/\s+/g, ''))}
                      className="text-xs font-extrabold rounded-full bg-brand-500/15 hover:bg-brand-500 text-brand-600 hover:text-ink-950 border border-brand-500/30 px-4 py-1.5 transition-all shadow-sm"
                    >
                      Rejoin
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ScheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(data) => { addMeeting(data); setModalOpen(false) }}
      />

      <NewMeetingPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onStart={handleStartConfirm}
        userName={user?.name || 'Irfan Khan'}
      />
    </div>
  )
}
