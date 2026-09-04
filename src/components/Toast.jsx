function Toast({ ticket }) {
  if (!ticket) return null

  return (
    <div className="toast">
      <div className="toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      </div>
      <div>
        <div className="toast-title">New ticket received</div>
        <div className="toast-subtitle">"{ticket.subject}" &mdash; {ticket.requester}</div>
      </div>
    </div>
  )
}

export default Toast
