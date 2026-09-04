import { useState } from 'react'
import './App.css'
import tickets from './data/tickets'
import TicketQueue from './components/TicketQueue'
import TicketDetail from './components/TicketDetail'

function App() {
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  return (
    <div>
      <h1>Help Desk Ticket Queue</h1>
      {selectedTicket ? (
        <TicketDetail
          ticket={selectedTicket}
          onBack={() => setSelectedTicketId(null)}
        />
      ) : (
        <TicketQueue onSelectTicket={setSelectedTicketId} />
      )}
    </div>
  )
}

export default App
