# Help Desk Simulator — Roadmap

A practice project for IT support skills (built alongside CompTIA A+ study) —
not a software dev portfolio piece, so features are chosen for what's useful
to *practice*, not to impress other developers.

## Done
- [x] Vite + React project scaffolded
- [x] Sample ticket data (`src/data/tickets.js`)
- [x] Ticket queue view — list of tickets (subject/priority/category), clickable
- [x] Ticket detail placeholder view + back navigation

## Next up
- [ ] Styling pass — make it look like a real internal tool (spacing,
      priority color-coding) instead of bare HTML
- [ ] AI-simulated customer chat in the ticket detail view (the centerpiece
      feature) — requires a small backend/serverless piece to hold the API
      key safely (can't call an AI API directly from the browser)
- [ ] Resolve / Close actions on a ticket, reflected as a status badge back
      in the queue (Open / In Progress / Resolved)

## Stretch ideas
- [ ] Troubleshooting notes field on a ticket (mirrors real documentation habits)
- [ ] Sorting/filtering the queue by priority or category

## Resume framing (for later)
- One-liner: "Help Desk Simulator — practice tool for IT support
  troubleshooting, ticket triage, and customer communication."
- README should lead with *why* it exists (A+ study practice), then
  features, then a screenshot/GIF, then tech stack.
- Resume bullet draft: "Built a help desk ticket simulator (React) with an
  AI-driven customer chat to practice IT troubleshooting and ticket triage
  — [github link]"
