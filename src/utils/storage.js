export const initialSessions = [
{ id: 1, studentID: 'S1001', counselor: 'Dr. A. Smith', dateTime: '2025-11-10 @ 10:00 AM', status: 'Pending' },
{ id: 2, studentID: 'S1005', counselor: 'Ms. L. Jones', dateTime: '2025-11-04 @ 2:00 PM', status: 'Conducted' },
{ id: 3, studentID: 'S1012', counselor: 'Dr. A. Smith', dateTime: '2025-11-12 @ 1:30 PM', status: 'Pending' }
]


export function getSessions() {
const stored = localStorage.getItem('wellnessSessions')
return stored ? JSON.parse(stored) : initialSessions
}
export function saveSessions(sessions) {
localStorage.setItem('wellnessSessions', JSON.stringify(sessions))
}

