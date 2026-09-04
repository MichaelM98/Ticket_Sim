import ChatPanel from './ChatPanel'

function TicketDetail({ ticket, onBack, onUpdateStatus }) {
  const initials = ticket.requester
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className="ticket-detail">
      <button className="back-link" onClick={onBack}>← Back to queue</button>

      <div className="detail-header">
        <div>
          <div className="detail-title">{ticket.subject}</div>
          <div className="ticket-meta">
            <span className={`badge pill-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
            <span className="badge pill-cat">{ticket.category}</span>
            <span className={`badge pill-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
          </div>
        </div>
        <div className="ticket-actions">
          <button onClick={() => onUpdateStatus(ticket.id, 'Resolved')}>Mark Resolved</button>
          <button onClick={() => onUpdateStatus(ticket.id, 'Closed')}>Close Ticket</button>
        </div>
      </div>

      <div className="detail-body">
        <ChatPanel ticket={ticket} />

        <div className="right-rail">
          <div className="info-card">
            <div className="info-card-title">Requester</div>
            <div className="requester-row">
              <div className="avatar avatar-accent">{initials}</div>
              <div>
                <div className="requester-name">{ticket.requester}</div>
                <div className="requester-dept">{ticket.department}</div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">Details</div>
            <div className="info-row">
              <span>Ticket ID</span>
              <span>#{ticket.id}</span>
            </div>
            <div className="info-row">
              <span>Category</span>
              <span>{ticket.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
