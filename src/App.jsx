import { useState } from 'react'
import './App.css'
import { generateTickets } from './data/generateTicket'
import Sidebar from './components/Sidebar'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'

function App() {
  const [tickets, setTickets] = useState(() => generateTickets(5))
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  function updateTicketStatus(id, newStatus) {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        {selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            onBack={() => setSelectedTicketId(null)}
            onUpdateStatus={updateTicketStatus}
          />
        ) : (
          <TicketQueue tickets={tickets} onSelectTicket={setSelectedTicketId} />
        )}
      </div>
    </div>
  )
}

export default App
