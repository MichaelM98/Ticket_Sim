import { useState } from 'react'
import './App.css'
import initialTickets from './data/tickets'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'

function App() {
  const [tickets, setTickets] = useState(initialTickets)
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
    <div className="app">
      <h1>Help Desk Ticket Queue</h1>
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
  )
}

export default App
