import TicketCard from './TicketCard';

function TicketQueue({ tickets, onSelectTicket }) {
    return (
        <div className="ticket-queue">
            {tickets.map((ticket) => (
                <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => onSelectTicket(ticket.id)}
                />
            ))}
        </div>
    )
}


export default TicketQueue
