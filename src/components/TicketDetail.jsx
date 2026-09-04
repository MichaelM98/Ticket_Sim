function TicketDetail({ ticket, onBack }) {
  return (
    <div>
      <button onClick={onBack}>← Back to queue</button>
      <h2>{ticket.subject}</h2>
      <p>Requester: {ticket.requester}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Category: {ticket.category}</p>
      <p>{ticket.description}</p>
      <p><em>Chat coming soon...</em></p>
    </div>
  )
}

export default TicketDetail
