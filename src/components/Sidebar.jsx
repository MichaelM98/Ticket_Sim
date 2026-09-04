function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M8 4v16M3 10h5" />
        </svg>
        <span>DeskFlow</span>
      </div>

      <div className="nav-item active">Tickets</div>
      <div className="nav-item">Customers</div>
      <div className="nav-item">Reports</div>

      <div className="sidebar-spacer" />

      <div className="sidebar-user">
        <div className="avatar">MM</div>
        <span>Michael</span>
      </div>
    </div>
  )
}

export default Sidebar
