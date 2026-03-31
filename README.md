# Jackie's Tees & Custom Apparel

Full-stack website for Jackie's Tees & Custom Apparel (Beverly, MA) — custom t-shirts and apparel with local pickup and nationwide shipping.

## Stack

- **Client:** React (Vite) + React Router + Tailwind CSS
- **Server:** Node.js (Express) + JSON file store (server/data/)
- **Validation:** Zod
- **Security:** Helmet, CORS, express-rate-limit

## Project Structure

```
/server     Express API + SQLite
/client     Vite + React + Tailwind
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server in dev mode |
| `npm run dev:client` | Start Vite dev server (port 5173) |
| `npm run dev:server` | Start Express with nodemon (port 5000) |
| `npm run build` | Build client + server |
| `npm start` | Start production server (serves client build) |

## Setup

1. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

2. (Optional) Create `server/.env` from `server/.env.example`:
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. Run in development:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

## Production

```bash
npm run build
NODE_ENV=production npm start
```

The server serves the built client from `client/dist` and binds to `process.env.PORT` (default 5000). Cloud Run ready.

## Free Hosting (Render)

This repo includes a `render.yaml` so you can deploy as one free web service.

1. Push this repo to GitHub.
2. In Render, click **New +** -> **Blueprint**.
3. Connect the repo and choose this project.
4. Render reads `render.yaml`, builds the client + server, and starts the app with `npm start`.

After deploy, open:

- `/` for the site
- `/api/health` for health check

Notes:

- Free instances on Render sleep after inactivity and wake on first request.
- Data is stored in `server/data/` on the instance filesystem, so free-hosted data is not durable across rebuilds/redeploys.

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/requests/order` — Submit custom order request
- `POST /api/requests/quote` — Submit quote request
- `GET /api/requests/recent?type=order|quote|all&limit=50` — List recent submissions (admin)
