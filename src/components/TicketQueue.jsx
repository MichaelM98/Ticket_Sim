import { useState } from 'react'
import TicketRow from './TicketRow';

function TicketQueue({ tickets, onSelectTicket, onReset }) {
    const [priorityFilter, setPriorityFilter] = useState('All')
    const [categoryFilter, setCategoryFilter] = useState('All')

    // Build the category dropdown options from whatever categories actually
    // exist in the current tickets, instead of a hardcoded list - a Set
    // automatically drops duplicates, and spreading it into an array with
    // [...set] gives back a plain array of the unique values.
    const categories = [...new Set(tickets.map((ticket) => ticket.category))]

    const filteredTickets = tickets.filter((ticket) => {
        const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter
        const matchesCategory = categoryFilter === 'All' || ticket.category === categoryFilter
        return matchesPriority && matchesCategory
    })

    return (
        <div>
            <div className="content-header">
                <div>
                    <div className="page-title">Ticket Queue</div>
                    <div className="page-subtitle">
                        {filteredTickets.length} of {tickets.length} tickets
                    </div>
                </div>
                <div className="queue-filters">
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                        <option value="All">All priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="All">All categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button className="reset-button" onClick={onReset}>New Batch</button>
                </div>
            </div>

            <div className="ticket-table">
                <div className="ticket-table-header">
                    <div>Subject</div>
                    <div>Requester</div>
                    <div>Priority</div>
                    <div>Category</div>
                    <div>Status</div>
                </div>
                {filteredTickets.map((ticket) => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        onClick={() => onSelectTicket(ticket.id)}
                    />
                ))}
                {filteredTickets.length === 0 && (
                    <div className="queue-empty">No tickets match these filters.</div>
                )}
            </div>
        </div>
    )
}


export default TicketQueue
