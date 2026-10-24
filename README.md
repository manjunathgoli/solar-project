# SunNova Solar

A full-stack solar installation and product-store demo with an AI assistant. The React site uses a Node/Express API and a persistent SQLite database. Checkout is intentionally a mock flow; it stores confirmed orders and adjusts inventory but does not collect payment.

## Project layout

- `client/` — React, Vite, React Router, Tailwind CSS and Recharts.
- `server/` — Express API, SQLite database, seed data and tests.
- `server/data/solar.db` — created and seeded automatically on first server start.

## Prerequisites

- Node.js 22 or newer and npm (the configured `better-sqlite3` release requires Node 22+).
- A Gemini API key only if you want live chatbot responses. Create one at [Google AI Studio](https://aistudio.google.com/apikey).

## Setup and run

1. Clone/download this project and open its root folder.
2. Install all dependencies: `npm run install:all`
3. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`. The model defaults to `gemini-3.8-flash`.
4. Seed or refresh the sample data: `npm run seed` (safe to run repeatedly).
5. Start the client and API together: `npm run dev`

The frontend is at [http://localhost:5173](http://localhost:5173); the API is at [http://localhost:5000](http://localhost:5000). The Vite development server proxies `/api` requests to Express. Without an API key, the site still works and the chatbot gives a friendly configuration message.

## Deploy (Vercel frontend + Render API)

The frontend and API deploy separately so the SQLite database can live on persistent storage. Do not deploy the Express server or its SQLite file as a Vercel function: Vercel function filesystems are not durable.

1. Push the project to a Git provider and import the repository into Vercel.
2. In Vercel, set **Root Directory** to `client` and enable including files from outside that directory if prompted. The `client/vercel.json` file configures the Vite build, static output, and React Router fallback.
3. Create the Render API from the root `render.yaml` blueprint. The blueprint uses the `server` directory and mounts a persistent disk at `server/data`; keep this disk attached to retain orders, quotes, contacts, and inventory between deploys. A Render plan that supports persistent disks is required.
4. In the Render service environment, set `GEMINI_API_KEY` to a valid secret and `CLIENT_URL` to the exact deployed Vercel origin, such as `https://your-project.vercel.app` (no trailing slash). For previews, add the exact preview origins as a comma-separated list.
5. In Vercel project environment variables, set `VITE_API_URL` to the Render service origin, such as `https://sunnova-api.onrender.com` (no trailing slash). Set it for Production and Preview as needed, then redeploy so the value is included in the frontend build.
6. Verify the Render health endpoint at `https://your-api.onrender.com/api/health` and test the Vercel site, product loading, quotes, checkout, and chatbot.

Never commit `.env` or put `GEMINI_API_KEY` in a Vercel `VITE_*` variable. The Gemini key belongs only in the Render service environment. The API's local default remains `http://localhost:5173`; production origins are controlled by `CLIENT_URL`. The Render persistent disk preserves SQLite data, but it is not a database backup—configure and test backups before relying on production order data.

For the first deployment, Render generates the API URL and Vercel generates the site URL. Set `CLIENT_URL` and `VITE_API_URL` to those final origins in their respective dashboards and redeploy the frontend after setting its API URL.

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
- On Vercel, configure `VITE_API_URL` as the public Render API origin; leave it unset for local development, where Vite proxies `/api` to port 5000.

## Quality checks

- `npm test` runs the API and calculator test suites.
- `npm run lint` runs the configured linters.
- `npm run build` creates the production frontend bundle.

## Troubleshooting

- If the API cannot start, verify that port 5000 is available and that `server/data` is writable.
- If the frontend cannot reach the API, start both processes with `npm run dev` and check the API log for startup errors.
- If chatbot replies are unavailable, add a valid `GEMINI_API_KEY` to `.env`, restart the backend, and check your Google AI Studio project quota and billing.
- If installation fails for `better-sqlite3`, install a supported Node.js LTS version and the platform build tools required by that package, then rerun `npm run install:all`.
