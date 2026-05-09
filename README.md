# ark-portfolio-legal

A polished Legal Case Management & Document Intelligence portfolio demo for fictional client **Silverstone Legal**, a mid-size 80-attorney law firm.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS v4
- shadcn/ui-style Radix components
- PostgreSQL + Drizzle schema
- Auth.js v5 credentials demo wiring
- Recharts visualizations

## Demo Features

- Case dashboard with 24 cases and live filters
- Case detail tabs: parties, timeline, documents, billing, communications, deadlines, notes
- Document management file tree and full-text search over 96 seeded documents
- AI contract analyzer with 5 pre-analyzed contracts and split-pane viewer
- Legal research RAG scripted chat
- Deadline tracker calendar and color-coded list
- Client portal view
- Billing, time, invoice preview, trust balance
- Document generator with NDA, engagement letter, and motion templates

## Development

```bash
npm install
npm run dev
npm run build
```

Set `DATABASE_URL` to use the Drizzle/PostgreSQL schema. The portfolio demo runs without a database by using seeded in-memory data.
