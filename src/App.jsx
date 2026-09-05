import { useState, useEffect } from 'react'
import './App.css'
import { generateTickets, generateTicket } from './data/generateTicket'
import { loadJSON, saveJSON } from './data/storage'
import Sidebar from './components/Sidebar'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'
import Toast from './components/Toast'
import Reports from './components/Reports'
import KnowledgeBase from './components/KnowledgeBase'

const emptyConversation = { messages: [], feedback: null, score: null, feedbackLoading: false }
const emptyStats = { scores: [] }

function App() {
  const [tickets, setTickets] = useState(() => loadJSON('deskflow-tickets', null) ?? generateTickets(5))
  const [conversations, setConversations] = useState(() => loadJSON('deskflow-conversations', {}))
  const [stats, setStats] = useState(() => loadJSON('deskflow-stats', emptyStats))
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [toastTicket, setToastTicket] = useState(null)
  const [view, setView] = useState('tickets')

  // Whenever these change, mirror them straight to localStorage so a
  // refresh (or closing the tab) doesn't lose any progress.
  useEffect(() => saveJSON('deskflow-tickets', tickets), [tickets])
  useEffect(() => saveJSON('deskflow-conversations', conversations), [conversations])
  useEffect(() => saveJSON('deskflow-stats', stats), [stats])

  function handleNavigate(nextView) {
    setView(nextView)
  }

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  function updateTicketStatus(id, newStatus) {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  function updateConversation(ticketId, updates) {
    setConversations((prev) => ({
      ...prev,
      [ticketId]: { ...(prev[ticketId] || emptyConversation), ...updates },
    }))
  }

  // Lifetime tracking - a score earned here is never lost, even if the
  // ticket that earned it later gets cleared out by "New Batch."
  function recordScore(score) {
    if (typeof score !== 'number') return
    setStats((prev) => ({ scores: [...prev.scores, score] }))
  }

  function resetQueue() {
    const confirmed = window.confirm(
      'Start a new batch of tickets? Any unresolved tickets in the current queue will be cleared. Your lifetime stats stay.'
    )
    if (!confirmed) return

    setTickets(generateTickets(5))
    setConversations({})
    setSelectedTicketId(null)
  }

  // Schedules a new random ticket to arrive after a random delay, then
  // reschedules itself again - so tickets keep trickling in the whole time
  // the app is open, at irregular, unpredictable intervals.
  useEffect(() => {
    let timeoutId

    function scheduleNextArrival() {
      const delay = 60000 + Math.random() * 60000 // 1-2 minutes
      timeoutId = setTimeout(() => {
        const newTicket = generateTicket()
        setTickets((prevTickets) => [newTicket, ...prevTickets])
        setToastTicket(newTicket)
        setTimeout(() => setToastTicket(null), 5000)
        scheduleNextArrival()
      }, delay)
    }

    scheduleNextArrival()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="app-shell">
      <Sidebar view={view} onNavigate={handleNavigate} />
      <div className="app-content">
        <div hidden={view !== 'tickets' || Boolean(selectedTicket)}>
          <TicketQueue tickets={tickets} onSelectTicket={setSelectedTicketId} onReset={resetQueue} />
        </div>
        <div hidden={view !== 'tickets' || !selectedTicket}>
          {selectedTicket && (
            <TicketDetail
              ticket={selectedTicket}
              conversation={conversations[selectedTicket.id] || emptyConversation}
              onUpdateConversation={(updates) => updateConversation(selectedTicket.id, updates)}
              onRecordScore={recordScore}
              onBack={() => setSelectedTicketId(null)}
              onUpdateStatus={updateTicketStatus}
            />
          )}
        </div>
        <div hidden={view !== 'reports'}>
          <Reports tickets={tickets} stats={stats} />
        </div>
        <div hidden={view !== 'kb'}>
          <KnowledgeBase />
        </div>
      </div>
      <Toast ticket={toastTicket} />
    </div>
  )
}

export default App
