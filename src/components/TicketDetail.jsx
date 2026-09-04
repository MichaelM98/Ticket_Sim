function TicketDetail({ ticket, onBack }) {
  return (
    <div className="ticket-detail">
      <button className="back-button" onClick={onBack}>← Back to queue</button>
      <h2>{ticket.subject}</h2>
      <p className="ticket-meta">
        <span className="priority-badge">{ticket.priority}</span>
        <span className="category-badge">{ticket.category}</span>
      </p>
      <p><strong>Requester:</strong> {ticket.requester}</p>
      <p>{ticket.description}</p>
      <p className="chat-placeholder"><em>Chat coming soon...</em></p>
    </div>
  )
}

export default TicketDetail
