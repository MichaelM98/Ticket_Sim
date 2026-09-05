import scenarios from './scenarios'
import requesters from './requesters'

const priorities = ['Low', 'Medium', 'High']

// Ticket IDs just need to be unique and look plausible - a running counter
// starting at a realistic-looking number does the job.
let nextId = 1001

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function generateTicket() {
  const scenario = pickRandom(scenarios)
  const requester = pickRandom(requesters)
  const priority = pickRandom(priorities)

  const ticket = {
    id: nextId,
    subject: scenario.subject,
    category: scenario.category,
    description: scenario.description,
    priority,
    requester: requester.name,
    department: requester.department,
    status: 'Open',
    // ~40% of customers are non-technical/vague in how they describe things,
    // instead of every customer giving a clear, complete description.
    vague: Math.random() < 0.4,
  }

  nextId += 1
  return ticket
}

export function generateTickets(count) {
  return Array.from({ length: count }, () => generateTicket())
}
