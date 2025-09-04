# Mini Event Tracker

**Mini Event Tracker** is a small, production-minded web application that allows users to create, manage and share events.  
Built with the MERN stack (MongoDB, Express, React, Node.js). Focus is on clean architecture, secure auth, good UX (responsive + dark/light mode), and clear documentation so an interviewer can understand design choices quickly.

---

## Table of Contents

- [Live demo](#live-demo) (optional)
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack & Reasoning](#tech-stack--reasoning)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [API Design (Endpoints)](#api-design-endpoints)
- [Getting Started (Local Setup)](#getting-started-local-setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Run Locally (quick)](#run-locally-quick)
- [Env Variables](#env-variables)
- [Database (Why MongoDB)](#database-why-mongodb)
- [Security Considerations](#security-considerations)
- [Trade-offs & Assumptions](#trade-offs--assumptions)
- [Testing & Debugging Tips](#testing--debugging-tips)
- [Possible Improvements / Roadmap](#possible-improvements--roadmap)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Live demo

(If deployed, put the URL here)
- Frontend: `https://...`
- Backend: `https://...`

---

## Project Overview

Mini Event Tracker enables users to:
- Register / Login (JWT-based)
- Create events with title, date & time, location, optional description
- View list of their own events
- Filter events by upcoming / past
- Generate a public share link for any event so anyone (without login) can view the event details

The app is split into:
- `server/` — Express API, MongoDB, auth, validation
- `client/` — React app (Vite), Tailwind CSS, responsive UI

---

## Features

- Email + password authentication (hashed with bcrypt)
- JWT-based sessions (httpOnly cookie or Authorization header depending on chosen setup)
- Event CRUD (create, read, update, delete)
- Upcoming / past filter
- Public share link with short slug (`shareId`)
- Frontend: responsive design + dark/light mode toggle
- Input validations (backend + frontend)
- Centralized error handling and clear API status codes

---

## Tech Stack & Reasoning

**Frontend**
- React (component-based UI, hooks) — fast DX and industry standard
- Vite — fast dev server & builds
- Tailwind CSS — rapid, consistent styling and responsive utilities
- dayjs — date formatting (small & reliable)

**Backend**
- Node.js + Express — lightweight and easy to iterate REST API
- Mongoose (MongoDB) — schema + validation, flexible for event documents
- bcryptjs — secure password hashing
- jsonwebtoken — JWT for auth
- zod (optional) / Joi or express-validator — validation (server side)

**Database**
- **MongoDB** — chosen because events are document-like, flexible (optional fields), and queries (by owner and dateTime) map well to collections and indexes. Easy scaling and quick prototyping. See "Database (Why MongoDB)" below.


Separation of concerns:
- **routes** handle HTTP mapping
- **controllers/services** contain business logic
- **models** contain DB schemas and model methods
- **middleware** handles auth and errors
- **client** consumes API via an `api` helper

---

## API Design (Endpoints)

> Base path: `/api`

### Auth
- `POST /api/auth/register`  
  Request: `{ "email": "x@x.com", "password": "P@ssw0rd!" }`  
  Response: `201` + user meta (sets cookie / returns token)

- `POST /api/auth/login`  
  Request: `{ "email", "password" }`  
  Response: `200` + user meta (sets cookie / returns token)

- `POST /api/auth/logout`  
  Clears cookie/session

- `GET /api/auth/me`  
  Returns current user info (or minimal `{ user: true }`) for client auth status

### Events (protected)
- `GET /api/events?filter=upcoming|past` — list user events  
- `POST /api/events` — create event `{ title, dateTime (ISO), location, description? }`  
- `PATCH /api/events/:id` — update event (only owner)  
- `DELETE /api/events/:id` — delete event (only owner)  
- `POST /api/events/:id/share` — `{ isPublic: boolean }` toggles public share and sets `shareId`

### Public
- `GET /api/public/e/:shareId` — fetch single public event (no auth)

**Status codes used:** `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `500`.

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js 18+ (or latest LTS)
- npm / yarn / pnpm
- MongoDB (local) or MongoDB Atlas
- (optional) Docker & docker-compose

### Backend Setup

```bash
# from repo root
cd backend

# install
npm install

# copy env
cp .env.example .env
# Edit .env to set MONGO_URI and JWT_SECRET

# run
npm run dev   # uses nodemon
# or
npm start


cd frontend
npm install

# copy env file
cp .env.example .env
# ensure VITE_API_BASE points to backend (e.g. http://localhost:5000)

npm run dev
# app serves at http://localhost:5173 (default Vite port)



Database (Why MongoDB)

Document model: An event is naturally modeled as a JSON document (title, dateTime, location, description, isPublic, shareId) — MongoDB stores this natively.

Schema flexibility: Events may get optional fields later (tags, attachments) without breaking existing rows.

Indexing & query patterns: We mainly query by owner and dateTime (for upcoming/past). MongoDB supports compound and single-field indexes efficiently.

Developer velocity: With Mongoose, we keep schema validation + easy migrations while building quickly.

Scalability: Horizontal scaling options via sharding (future-proof).

Security Considerations

Passwords hashed using bcrypt (salted).

JWT tokens — either returned to client (Authorization header) or set in httpOnly cookies to mitigate XSS.

CORS restricted to the frontend origin in production.

Input validation on server-side (e.g., using Zod/Joi/express-validator) to avoid malformed data.

Helmet, rate-limiting and auditing are recommended for production (not in minimal demo).

Avoid exposing user-identifying data on public share endpoints.

Trade-offs & Assumptions

Auth: Chose JWT for simplicity and statelessness. If more strict session control or revocation is required, use server sessions or token blacklists.

Share links: Lightweight shareId stored on event. Not cryptographically guaranteed secret — acceptable for basic sharing. For sensitive events, add access tokens & expiry.

No attachments: File/image support not implemented to keep scope focused.

Client-side timezone: Dates are stored as ISO UTC; client converts to local display. Assumes user device timezone is correct.

Testing & Debugging Tips

Use Postman/Insomnia to test auth and events endpoints.

Check cookies and Authorization header for JWT on protected calls.

Inspect network tab in browser to ensure withCredentials: true when using httpOnly cookies.

Logs: backend prints DB connection and request logs (if using morgan).

Possible Improvements / Roadmap

Add pagination & search on events

Add file attachments or calendar export (iCal)

Add role-based access (teams / organizations)

Rate-limit auth endpoints & add email verification

Add unit/integration tests (Jest + Supertest) for API

Deploy: backend → Railway / Render; frontend → Vercel / Netlify; DB → MongoDB Atlas

Acknowledgements

React, Vite, Tailwind, Express, Mongoose communities — for great tooling

Project template inspired by standard MERN best practices

License

MIT License — feel free to reuse and adapt.

Notes for interviewers

Implementation focuses on clear separation of concerns: routes → controllers/services → models.

Emphasizes security basics (password hashing, input validation) and a user-friendly frontend (responsiveness, accessibility, dark mode).

Easy to extend and deploy; clear README and .env.example included for reproducibility.