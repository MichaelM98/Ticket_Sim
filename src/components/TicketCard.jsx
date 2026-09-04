function TicketCard({ ticket, onClick}) {
    return (
        <div onClick={onClick}>
            <h3>{ticket.subject}</h3>
            <p>{ticket.priority} . {ticket.category}</p>
        </div>
    )
}

export default TicketCard