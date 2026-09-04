function TicketCard({ ticket, onClick }) {
  return (
    <div className={`ticket-card priority-${ticket.priority.toLowerCase()}`} onClick={onClick}>
      <h3>{ticket.subject}</h3>
      <p className="ticket-meta">
        <span className="priority-badge">{ticket.priority}</span>
        <span className="category-badge">{ticket.category}</span>
      </p>
    </div>
  )
}

export default TicketCard
