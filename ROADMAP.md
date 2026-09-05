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
      in the queue (Open / Resolved / Closed) — **superseded below**: this
      originally reset on reload on purpose; once scoring/tracking was added
      that stopped making sense, so it's now persisted instead (see v2.6).

## Stretch ideas
- [x] Sorting/filtering the queue by priority or category — dropdown filters
      in `TicketQueue.jsx`, category list built dynamically from whatever's
      in the current batch

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
- [x] Vague/non-technical customers — ~40% of generated tickets get a hidden
      `vague` flag that adds instructions to the AI's system prompt so that
      customer needs to be drawn out with good questions instead of giving
      clear details up front; invisible in the UI, so it's a surprise.
- [x] Small built-in Knowledge Base — 8 short, searchable troubleshooting
      articles (`src/data/knowledgeBase.js`) covering the common ticket
      categories, its own sidebar tab.
- [x] (Bug fix, found while building this) Per-ticket conversations now
      persist in `App.jsx` (keyed by ticket id) instead of living inside
      `TicketDetail`'s local state — switching sidebar tabs *or* going back
      to the queue and reopening the same ticket no longer wipes the chat.

## v2.6 — persistence, scoring, and lifetime tracking
- [x] Numeric feedback score (1-5) alongside the written critique — backend
      asks Claude for an exact `SCORE:`/`FEEDBACK:` format and parses it
      with a regex, falling back to text-only if the format isn't followed.
- [x] `localStorage` persistence — tickets, conversations, and lifetime
      stats all survive a refresh or closing the tab (`src/data/storage.js`).
- [x] Lifetime stats (tickets rated, average score) shown on Reports as
      "Your Progress" — separate from the current batch's stats, and never
      cleared by a reset.
- [x] "New Batch" button (with a confirm prompt) generates a fresh set of
      tickets and clears current conversations, without touching lifetime
      stats — the deliberate reset control now that reload no longer resets
      anything.

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
