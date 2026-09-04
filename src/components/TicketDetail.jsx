import ChatPanel from './ChatPanel'

function TicketDetail({ ticket, onBack, onUpdateStatus }) {
  return (
    <div className="ticket-detail">
      <button className="back-button" onClick={onBack}>← Back to queue</button>
      <h2>{ticket.subject}</h2>
      <p className="ticket-meta">
        <span className="priority-badge">{ticket.priority}</span>
        <span className="category-badge">{ticket.category}</span>
        <span className={`status-badge status-${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </p>
      <p><strong>Requester:</strong> {ticket.requester}</p>
      <div className="ticket-actions">
        <button onClick={() => onUpdateStatus(ticket.id, 'Resolved')}>
          Mark Resolved
        </button>
        <button onClick={() => onUpdateStatus(ticket.id, 'Closed')}>
          Close Ticket
        </button>
      </div>
      <ChatPanel ticket={ticket} />
    </div>
  )
}

export default TicketDetail
