import TicketRow from './TicketRow';

function TicketQueue({ tickets, onSelectTicket }) {
    return (
        <div>
            <div className="content-header">
                <div>
                    <div className="page-title">Ticket Queue</div>
                    <div className="page-subtitle">{tickets.length} tickets</div>
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
                {tickets.map((ticket) => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        onClick={() => onSelectTicket(ticket.id)}
                    />
                ))}
            </div>
        </div>
    )
}


export default TicketQueue
