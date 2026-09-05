import { useState, useEffect } from 'react'
import './App.css'
import { generateTickets, generateTicket } from './data/generateTicket'
import Sidebar from './components/Sidebar'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'
import Toast from './components/Toast'
import Reports from './components/Reports'
import KnowledgeBase from './components/KnowledgeBase'

const emptyConversation = { messages: [], feedback: null, feedbackLoading: false }

function App() {
  const [tickets, setTickets] = useState(() => generateTickets(5))
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [toastTicket, setToastTicket] = useState(null)
  const [view, setView] = useState('tickets')
  // Each ticket's conversation, keyed by ticket id - lives here instead of
  // inside TicketDetail, so it survives even when TicketDetail unmounts
  // (going back to the queue, then reopening the same ticket).
  const [conversations, setConversations] = useState({})

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
          <TicketQueue tickets={tickets} onSelectTicket={setSelectedTicketId} />
        </div>
        <div hidden={view !== 'tickets' || !selectedTicket}>
          {selectedTicket && (
            <TicketDetail
              ticket={selectedTicket}
              conversation={conversations[selectedTicket.id] || emptyConversation}
              onUpdateConversation={(updates) => updateConversation(selectedTicket.id, updates)}
              onBack={() => setSelectedTicketId(null)}
              onUpdateStatus={updateTicketStatus}
            />
          )}
        </div>
        <div hidden={view !== 'reports'}>
          <Reports tickets={tickets} />
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
