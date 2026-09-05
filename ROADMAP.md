# Help Desk Simulator — Roadmap

A practice project for IT support skills (built alongside CompTIA A+ study) —
not a software dev portfolio piece, so features are chosen for what's useful
to *practice*, not to impress other developers.

## Done
- [x] Vite + React project scaffolded
- [x] Ticket queue view — list of tickets (subject/priority/category), clickable
- [x] Ticket detail placeholder view + back navigation

## Next up
- [x] Styling pass — make it look like a real internal tool (spacing,
      priority color-coding) instead of bare HTML
- [x] AI-simulated customer chat in the ticket detail view (the centerpiece
      feature) — Express backend (`server/`) holds the API key, calls
      Claude Haiku 4.5, frontend `ChatPanel.jsx` talks to it
- [x] Resolve / Close actions on a ticket, reflected as a status badge back
      in the queue (Open / Resolved / Closed) — intentionally resets on page
      reload (no persistence) so every reload is a fresh practice run

## Stretch ideas
- [ ] Sorting/filtering the queue by priority or category

## v2 — realism pass
Mockup (approved): https://claude.ai/code/artifact/8e6622c3-99c0-471c-84ea-4e7e16412b2c
- [x] Zendesk-inspired redesign (original look, not a copy) — dark sidebar
      nav ("DeskFlow" branding), dense ticket table, ticket detail with a
      chat + right-rail (Requester/Details) layout
- [x] Troubleshooting notes — woven into the chat timeline itself as a
      distinct "Internal note — not visible to requester" bubble, with a
      Reply / Internal Note toggle above the input; notes are filtered out
      before anything is sent to the AI, so the customer never sees them
- [x] Randomized tickets instead of the fixed 4 — a template-based generator
      (`src/data/generateTicket.js`) mixing 14 scenarios × 10 requesters × 3
      priorities by plain code, free & instant; app loads with 5 random
      tickets each time. AI-generated tickets (via Claude, more variety/
      realism) still a possible later upgrade.
- [x] Tickets arrive as random "live" events while the app is open — a new
      randomly-generated ticket appears every 20-45 seconds with a toast
      alert ("New ticket received!"), via a self-rescheduling `setTimeout`
      in `App.jsx`
- [x] Real "Reports" page — Status/Category/Priority breakdowns (counts +
      bars) for the current session's tickets; sidebar nav now actually
      switches between Tickets/Reports ("Customers" stays decorative)

## v2.5 — deeper practice value
Claude's picks for what actually builds the underlying skill, not just
"looks realistic":
- [x] Post-resolution AI feedback — on Mark Resolved, `/api/feedback` sends
      the (notes-stripped) transcript to Claude as a "quality reviewer" who
      briefly critiques questions asked, professionalism, and whether the
      root cause was found; shown as a Feedback card in the right rail.
      Required lifting chat state from `ChatPanel` up to `TicketDetail`.
- [x] Escalation option — an "Escalate to Tier 2" action alongside Resolve/
      Close, with its own "Escalated" status/badge (reflected in the queue
      table and Reports breakdown too).
- [ ] Vague/non-technical customers — some generated tickets spawn a customer
      who describes their problem imprecisely ("it's just not working") and
      needs to be drawn out with good questions, instead of every customer
      giving a clear, complete description up front.
- [ ] Small built-in Knowledge Base — a handful of short troubleshooting
      articles (searchable) covering the common ticket categories, so there's
      something realistic to reference mid-ticket instead of working from
      memory alone.

## v3 — ideas (not started)
- [ ] Package the app so it's downloadable/runnable locally as a standalone
      program, not just a dev server (`npm run dev`). Likely needs something
      like Electron/Tauri to bundle both the React frontend and the Express
      backend together — needs more research when we get there.

## Resume framing (for later)
- One-liner: "Help Desk Simulator — practice tool for IT support
  troubleshooting, ticket triage, and customer communication."
- README should lead with *why* it exists (A+ study practice), then
  features, then a screenshot/GIF, then tech stack.
- Resume bullet draft: "Built a help desk ticket simulator (React) with an
  AI-driven customer chat to practice IT troubleshooting and ticket triage
  — [github link]"
