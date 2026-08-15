import { createContext, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addScheduledMeeting, deleteScheduledMeeting, addHistoryEntry } from '../redux/slices/meetingsSlice'

const MeetingsContext = createContext()

export function MeetingsProvider({ children }) {
  const dispatch = useDispatch()
  const { upcomingMeetings = [], meetingHistory = [] } = useSelector((state) => state.meetings || {})

  return (
    <MeetingsContext.Provider
      value={{
        meetings: upcomingMeetings,
        upcomingMeetings,
        meetingHistory,
        addMeeting: (m) => dispatch(addScheduledMeeting(m)),
        addScheduledMeeting: (m) => dispatch(addScheduledMeeting(m)),
        deleteScheduledMeeting: (id) => dispatch(deleteScheduledMeeting(id)),
        addHistoryEntry: (entry) => dispatch(addHistoryEntry(entry)),
      }}
    >
      {children}
    </MeetingsContext.Provider>
  )
}

export function useMeetings() {
  const context = useContext(MeetingsContext)
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingsProvider')
  }
  return context
}
