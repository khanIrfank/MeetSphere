import { createSlice } from '@reduxjs/toolkit'
import { initialMeetings, initialMeetingHistory, createMeeting } from '../../data/meetings'

const initialState = {
  upcomingMeetings: initialMeetings,
  meetingHistory: initialMeetingHistory,
}

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    addScheduledMeeting: (state, action) => {
      const newM = createMeeting(action.payload)
      state.upcomingMeetings.unshift(newM)
    },
    deleteScheduledMeeting: (state, action) => {
      state.upcomingMeetings = state.upcomingMeetings.filter((m) => m.id !== action.payload)
    },
    addHistoryEntry: (state, action) => {
      const entry = {
        id: `h-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        ...action.payload,
      }
      state.meetingHistory.unshift(entry)
    },
  },
})

export const { addScheduledMeeting, deleteScheduledMeeting, addHistoryEntry } = meetingsSlice.actions
export default meetingsSlice.reducer
