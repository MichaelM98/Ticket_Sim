// Tallies how many tickets share each value of a field, e.g.
// countBy(tickets, 'status') -> { Open: 3, Resolved: 1, Closed: 1 }
function countBy(tickets, field) {
  const counts = {}
  for (const ticket of tickets) {
    const key = ticket[field]
    counts[key] = (counts[key] || 0) + 1
  }
  return counts
}

function BreakdownCard({ title, counts, total, order }) {
  const keys = order ?? Object.keys(counts)

  return (
    <div className="info-card">
      <div className="info-card-title">{title}</div>
      {keys.map((key) => {
        const count = counts[key] || 0
        const percent = total === 0 ? 0 : Math.round((count / total) * 100)
        return (
          <div key={key} className="report-row">
            <div className="report-row-label">
              <span>{key}</span>
              <span>{count}</span>
            </div>
            <div className="report-bar-track">
              <div className="report-bar-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Reports({ tickets, stats }) {
  const total = tickets.length
  const statusCounts = countBy(tickets, 'status')
  const categoryCounts = countBy(tickets, 'category')
  const priorityCounts = countBy(tickets, 'priority')

  const scores = stats.scores
  const averageScore = scores.length
    ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)
    : null

  return (
    <div>
      <div className="content-header">
        <div>
          <div className="page-title">Reports</div>
          <div className="page-subtitle">Current batch &middot; {total} tickets</div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="info-card">
          <div className="info-card-title">Your Progress (lifetime)</div>
          <div className="info-row">
            <span>Tickets rated</span>
            <span>{scores.length}</span>
          </div>
          <div className="info-row">
            <span>Average score</span>
            <span>{averageScore ? `${averageScore} / 5` : '—'}</span>
          </div>
        </div>
        <BreakdownCard
          title="Status"
          counts={statusCounts}
          total={total}
          order={['Open', 'Escalated', 'Resolved', 'Closed']}
        />
        <BreakdownCard title="Category" counts={categoryCounts} total={total} />
        <BreakdownCard
          title="Priority"
          counts={priorityCounts}
          total={total}
          order={['High', 'Medium', 'Low']}
        />
      </div>
    </div>
  )
}

export default Reports
