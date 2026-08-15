export const mockChatMessages = [
  { id: 1, author: 'Aisha Khan', text: 'Good morning everyone 👋 Welcome to the 500+ user summit!', time: '11:31' },
  { id: 2, author: 'Rohit Verma', text: 'Sharing the roadmap presentation doc.', time: '11:32' },
  { id: 3, author: 'You', text: 'Sounds good, let us begin the session.', time: '11:33' },
]

export const initialMeetings = [
  {
    id: 'm1',
    title: 'Product Design Sync',
    date: '2026-08-15',
    time: '10:00 AM',
    duration: 45,
    meetingId: '849 2039 1042',
    passcode: '982341',
  },
  {
    id: 'm2',
    title: 'Engineering All-Hands Summit',
    date: '2026-08-18',
    time: '02:30 PM',
    duration: 60,
    meetingId: '392 1048 5719',
    passcode: '449102',
  },
]

export const initialMeetingHistory = [
  {
    id: 'h1',
    title: 'Weekly Standup & Retrospective',
    date: '2026-08-10',
    time: '11:00 AM',
    duration: 30,
    meetingId: '102 9481 0482',
    participantsCount: 42,
    status: 'Completed',
  },
]

export function createMeeting(data) {
  return {
    id: `m-${Date.now()}`,
    title: data.title || 'Untitled Meeting',
    date: data.date || new Date().toISOString().slice(0, 10),
    time: data.time || '10:00 AM',
    duration: data.duration || 30,
    meetingId: `${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
    passcode: Math.floor(100000 + Math.random() * 900000).toString(),
  }
}

// Generate scalable mock participants (up to 1,000 users)
// Non-host users generate with muted: true BY DEFAULT as requested!
export function generateMockParticipantsList(count = 500, selfName = 'Irfan Khan') {
  const names = [
    'Aisha Khan', 'Aditya Saxena', 'Sophia Venkatesh', 'Arjun Patel',
    'Simran Miller', 'Kabir Nair', 'Zoya Shah', 'Aarav Rao',
    'Neha Verma', 'Devansh Garcia', 'Sneha Banerjee', 'Rohan Chopra',
    'Ananya Deshmukh', 'Ishaan Malhotra', 'Pooja Bhatia', 'Vikram Joshi'
  ]

  const roles = [
    'UI/UX Lead', 'Product Manager', 'QA Specialist', 'DevOps Lead',
    'Data Analyst', 'Solution Architect', 'Marketing Strategist', 'Security Analyst',
    'Frontend Eng', 'Backend Specialist', 'System Admin', 'Scrum Master'
  ]

  const list = []

  // Self Host
  list.push({
    id: 'self-host',
    name: selfName,
    role: 'Main Host',
    isHost: true,
    isCoHost: false,
    isSelf: true,
    muted: false,
    camOn: true,
  })

  // Co-Hosts & regular users (ALL regular users start muted: true BY DEFAULT!)
  for (let i = 1; i < count; i++) {
    const nameIndex = (i - 1) % names.length
    const roleIndex = (i - 1) % roles.length
    const isCoHost = i <= 3 // Default 3 co-hosts

    list.push({
      id: `user-${i}`,
      name: count > names.length ? `${names[nameIndex]} #${i}` : names[nameIndex],
      role: isCoHost ? 'Co-Host' : roles[roleIndex],
      isHost: false,
      isCoHost: isCoHost,
      isSelf: false,
      muted: true, // BY DEFAULT USERS MIC IS OFF!
      camOn: i % 2 === 0,
    })
  }

  return list
}
