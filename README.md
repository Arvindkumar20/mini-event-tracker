const readmeContent = `# Mini Event Tracker (MERN)

A minimal, production-style event tracker with:
- **Backend:** Node.js + Express + MongoDB (Mongoose), JWT (httpOnly cookie), Zod validation
- **Frontend:** React + Vite + Tailwind, Axios, React Router, Day.js
- **Features:** Email+Password auth, create/edit/delete events, upcoming/past filter, public share link

## Why MongoDB?
Events are user-scoped, document-like entities with flexible fields (optional description, sharing flags). MongoDB's schema-flexible documents map cleanly to event objects, simplify iteration, and scale horizontally. With Mongoose, we still enforce constraints (indexes, types). For a small tracker, MongoDB offers fast prototyping and production readiness with minimal friction.

## Quick Start

### Prereqs
- Node 18+
- pnpm/yarn/npm
- MongoDB atlas 

### Backend
\`\`\`bash
cd server
cp .env.example .env
# edit .env if needed
npm i
npm dev
\`\`\``;