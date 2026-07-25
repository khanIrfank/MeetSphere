import { createContext, useContext, useState } from 'react'
import { initialMeetings, initialMeetingHistory, createMeeting } from '../data/meetings'

const MeetingsContext = createContext(null)

export function MeetingsProvider({ children }) {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [meetingHistory, setMeetingHistory] = useState(initialMeetingHistory)

  const addMeeting = (data) => {
    const meeting = createMeeting(data)
    setMeetings((prev) => [...prev, meeting].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))
    return meeting
  }

  const removeMeeting = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id))
  }

  const addHistoryEntry = (entry) => {
    setMeetingHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        title: entry.title || 'Completed Meeting',
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: entry.duration || 30,
        host: entry.host || 'You',
        meetingId: entry.meetingId || '849 2039 1042',
        participantsCount: entry.participantsCount || 4,
        status: 'Completed',
      },
      ...prev,
    ])
  }

  return (
    <MeetingsContext.Provider value={{ meetings, meetingHistory, addMeeting, removeMeeting, addHistoryEntry }}>
      {children}
    </MeetingsContext.Provider>
  )
}

export const useMeetings = () => useContext(MeetingsContext)
