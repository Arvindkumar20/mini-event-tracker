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
cd server

# install
npm install

# copy env
cp .env.example .env
# Edit .env to set MONGO_URI and JWT_SECRET

# run
npm run dev   # uses nodemon
# or
npm start


