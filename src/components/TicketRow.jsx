function TicketRow({ ticket, onClick }) {
  return (
    <div className="ticket-row" onClick={onClick}>
      <div className="col-subject">{ticket.subject}</div>
      <div className="col-requester">{ticket.requester}</div>
      <div>
        <span className={`badge pill-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
      </div>
      <div>
        <span className="badge pill-cat">{ticket.category}</span>
      </div>
      <div>
        <span className={`badge pill-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
      </div>
    </div>
  )
}

export default TicketRow
