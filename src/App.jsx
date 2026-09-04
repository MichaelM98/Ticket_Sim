import { useState, useEffect } from 'react'
import './App.css'
import { generateTickets, generateTicket } from './data/generateTicket'
import Sidebar from './components/Sidebar'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'
import Toast from './components/Toast'
import Reports from './components/Reports'

function App() {
  const [tickets, setTickets] = useState(() => generateTickets(5))
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [toastTicket, setToastTicket] = useState(null)
  const [view, setView] = useState('tickets')

  function handleNavigate(nextView) {
    setView(nextView)
    setSelectedTicketId(null)
  }

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  function updateTicketStatus(id, newStatus) {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  // Schedules a new random ticket to arrive after a random delay, then
  // reschedules itself again - so tickets keep trickling in the whole time
  // the app is open, at irregular, unpredictable intervals.
  useEffect(() => {
    let timeoutId

    function scheduleNextArrival() {
      const delay = 20000 + Math.random() * 25000 // 20-45 seconds
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
        {view === 'reports' ? (
          <Reports tickets={tickets} />
        ) : selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            onBack={() => setSelectedTicketId(null)}
            onUpdateStatus={updateTicketStatus}
          />
        ) : (
          <TicketQueue tickets={tickets} onSelectTicket={setSelectedTicketId} />
        )}
      </div>
      <Toast ticket={toastTicket} />
    </div>
  )
}

export default App
