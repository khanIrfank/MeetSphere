// Mock meeting data for MeetSphere
let idCounter = 1000

export const initialMeetings = [
  {
    id: 'm-1',
    title: 'Design Sync — Q3 Roadmap',
    date: new Date().toISOString().slice(0, 10),
    time: '11:30',
    duration: 30,
    host: 'You',
    participants: ['Aisha Khan', 'Rohit Verma', 'You'],
    meetingId: '812 4471 0032',
    passcode: '482910',
  },
  {
    id: 'm-2',
    title: 'Client Onboarding Call',
    date: new Date().toISOString().slice(0, 10),
    time: '14:00',
    duration: 45,
    host: 'You',
    participants: ['Meera Iyer', 'You'],
    meetingId: '905 2210 9981',
    passcode: '119284',
  },
  {
    id: 'm-3',
    title: 'Weekly Engineering Standup',
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: '09:15',
    duration: 15,
    host: 'Rohit Verma',
    participants: ['Rohit Verma', 'Aisha Khan', 'Devansh Rao', 'You'],
    meetingId: '773 1120 4456',
    passcode: '558210',
  },
]

export const initialMeetingHistory = [
  {
    id: 'h-1',
    title: 'Product Strategy Review',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    time: '16:00',
    duration: 50,
    host: 'You',
    meetingId: '441 9021 3342',
    participantsCount: 4,
    status: 'Completed',
  },
  {
    id: 'h-2',
    title: 'Sprint Planning & Backlog Grooming',
    date: new Date(Date.now() - 172800000).toISOString().slice(0, 10),
    time: '10:00',
    duration: 60,
    host: 'Aisha Khan',
    meetingId: '610 8892 1104',
    participantsCount: 6,
    status: 'Completed',
  },
  {
    id: 'h-3',
    title: 'UX Review — Mobile App Refresh',
    date: new Date(Date.now() - 259200000).toISOString().slice(0, 10),
    time: '15:30',
    duration: 35,
    host: 'You',
    meetingId: '782 3019 5561',
    participantsCount: 3,
    status: 'Completed',
  },
]

export function createMeeting({ title, date, time, duration }) {
  idCounter += 1
  return {
    id: `m-${idCounter}`,
    title: title || 'Untitled Meeting',
    date,
    time,
    duration: Number(duration) || 30,
    host: 'You',
    participants: ['You'],
    meetingId: `${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
    passcode: String(Math.floor(100000 + Math.random() * 900000)),
  }
}

export const mockParticipants = [
  { id: 1, name: 'You', muted: false, camOn: true, isSelf: true },
  { id: 2, name: 'Aisha Khan', muted: true, camOn: true },
  { id: 3, name: 'Rohit Verma', muted: false, camOn: false },
  { id: 4, name: 'Meera Iyer', muted: true, camOn: true },
]

export const mockChatMessages = [
  { id: 1, author: 'Aisha Khan', text: 'Good morning everyone 👋', time: '11:31' },
  { id: 2, author: 'Rohit Verma', text: 'Sharing the roadmap doc in a sec.', time: '11:32' },
  { id: 3, author: 'You', text: 'Sounds good, ready when you are.', time: '11:33' },
]
