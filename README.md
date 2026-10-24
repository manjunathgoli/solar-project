# SunNova Solar

A full-stack solar installation and product-store demo with an AI assistant. The React site uses a Node/Express API and a persistent SQLite database. Checkout is intentionally a mock flow; it stores confirmed orders and adjusts inventory but does not collect payment.

## Project layout

- `client/` — React, Vite, React Router, Tailwind CSS and Recharts.
- `server/` — Express API, SQLite database, seed data and tests.
- `server/data/solar.db` — created and seeded automatically on first server start.

## Prerequisites

- Node.js 22.x and npm (both Vercel services are pinned to Node 22).
- A Gemini API key only if you want live chatbot responses. Create one at [Google AI Studio](https://aistudio.google.com/apikey).

## Setup and run

1. Clone/download this project and open its root folder.
2. Install all dependencies: `npm run install:all`
3. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`. The model defaults to `gemini-3.8-flash`.
4. Seed or refresh the sample data: `npm run seed` (safe to run repeatedly).
5. Start the client and API together: `npm run dev`

The frontend is at [http://localhost:5173](http://localhost:5173); the API is at [http://localhost:5000](http://localhost:5000). The Vite development server proxies `/api` requests to Express. Without an API key, the site still works and the chatbot gives a friendly configuration message.

## Deploy (Vercel multi-service project)

The root `vercel.json` deploys two services together under one Vercel project and domain:

- `client` (`client/`, Vite) serves the website and client-side routes.
- `sunnova-api` (`server/`, Express) serves `/api/*`.

The `/api/(.*)` rewrite is listed before the frontend catch-all. The browser uses same-origin `/api` URLs, so no service binding or frontend API URL variable is needed. The API calls Gemini externally; it does not call the frontend service.

1. Push the repository to a Git provider, import the repository root into Vercel, and leave the project root at the repository root so Vercel reads the root `vercel.json`.
2. In Vercel Project Settings → Environment Variables, set `GEMINI_API_KEY` for the environments where chat should be enabled. `GEMINI_MODEL` is optional and defaults in the API to `gemini-3.8-flash`.
3. Deploy. Check `https://your-domain/api/health`, then test product loading, client-side navigation, quotes, checkout, and chat.
4. For local multi-service routing, install/use Vercel CLI 47.0.5 or newer and run `npx vercel dev` from the repository root. The regular `npm run dev` remains available for separate local Vite and Express servers.

**SQLite storage warning:** Vercel function filesystems are ephemeral and are not a durable place for the SQLite database. The products and other seed data are recreated when an instance starts, but orders, quotes, contacts, and stock changes can disappear or diverge between instances. Use this Vercel setup for a demo/test unless you migrate persistent application data to a managed database such as Turso/libSQL or Postgres. Do not use this deployment for real customer orders until persistence, backups, and inventory consistency are handled.

Never commit `.env` or expose `GEMINI_API_KEY` in a `VITE_*` variable. Keep the key in Vercel's server-side environment variables only.

## API

- `GET /api/health`
- `GET /api/products?search=&category=&sort=&page=&limit=`
- `GET /api/products/:id`, `GET /api/categories`
- `POST /api/orders`, `GET /api/orders/:id`
- `POST /api/quotes`, `POST /api/contact`
- `GET /api/projects`
- `GET /api/blog`, `GET /api/blog/:slug`
- `GET /api/faqs`, `GET /api/testimonials`
- `POST /api/calculator`
- `POST /api/chat`

The API validates user input, applies restrictive CORS and security headers, logs requests, and uses parameterized SQLite queries. Order creation and stock decrement are one transaction. SQLite data is seeded with products, projects, articles, FAQs and testimonials using idempotent inserts.

## Chatbot

The browser sends up to ten chat messages to the backend. The backend validates and bounds the input, matches relevant live products from SQLite, and sends the resulting product facts with an India-specific solar-only system prompt to Gemini using Google's OpenAI-compatible API endpoint. Responses stay within the Indian solar and site-help scope and are capped at 99 lines for both streaming and non-streaming requests. Streaming responses use server-sent events; non-streaming JSON is also supported. The Gemini API key is read only from the server environment and is never sent to the browser. The API applies a separate rate limit to `/api/chat`.

## Configuration

- Change the brand name and currency in `shared/site.js`.
- Brand imagery uses Unsplash URLs and can be replaced in `client/src/App.jsx` and the seed data.
- The primary green and yellow theme is defined in `client/src/styles.css`.
- Server options are in `.env`: `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-3.8-flash`), `PORT` (default `5000`), `CLIENT_URL` (default `http://localhost:5173`; comma-separated origins are supported) and optional `SOLAR_DATA_DIR` (defaults to `server/data`).
- The frontend uses same-origin `/api` URLs. Local Vite development proxies `/api` to port 5000; Vercel routes `/api/*` to the `sunnova-api` service.

## Quality checks

- `npm test` runs the API and calculator test suites.
- `npm run lint` runs the configured linters.
- `npm run build` creates the production frontend bundle.

## Troubleshooting

- If the API cannot start, verify that port 5000 is available and that `server/data` is writable.
- If the frontend cannot reach the API, start both processes with `npm run dev` and check the API log for startup errors.
- If chatbot replies are unavailable, add a valid `GEMINI_API_KEY` to `.env`, restart the backend, and check your Google AI Studio project quota and billing.
- If installation fails for `better-sqlite3`, install a supported Node.js LTS version and the platform build tools required by that package, then rerun `npm run install:all`.
