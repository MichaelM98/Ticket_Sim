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
- [ ] Real "Reports" page (currently just a decorative sidebar link) —
      e.g. tickets resolved by category, a simple practice-tracking view

## v2 — realism pass
Mockup (approved): https://claude.ai/code/artifact/8e6622c3-99c0-471c-84ea-4e7e16412b2c
- [x] Zendesk-inspired redesign (original look, not a copy) — dark sidebar
      nav ("DeskFlow" branding), dense ticket table, ticket detail with a
      chat + right-rail (Requester/Details) layout
- [ ] Troubleshooting notes — woven into the chat timeline itself as a
      distinct "Internal note — not visible to requester" bubble, with a
      Reply / Internal Note toggle above the input (matches how Zendesk/
      ServiceNow actually do it, per mockup decision) — mockup approved,
      not yet built in code
- [ ] Randomized tickets instead of the fixed 4 — starting with a
      template-based generator (pools of categories/subjects/names/
      priorities mixed by plain code, free & instant); AI-generated tickets
      (via Claude, more variety/realism) planned as a later upgrade once
      this mechanic works end-to-end.
- [ ] Tickets arrive as random "live" events while the app is open — a
      visible toast/alert ("New ticket received!") when one comes in, not
      just a silent queue update.

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
