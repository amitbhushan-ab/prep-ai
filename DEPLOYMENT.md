# PrepAI Deployment Guide

PrepAI can be deployed in two standard production modes:
1. **Unified Full-Stack Deployment (Recommended)**: Both Frontend and Backend run in a single Node service. Ideal for Render, Railway, Fly.io, or Docker. (Single URL, no CORS setup required).
2. **Decoupled Deployment**: Frontend on Vercel/Netlify and Backend on Render/Railway/Fly.io.

---

## Environment Variables Reference

### Backend

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `JWT_SECRET` | **Yes** | 32+ character random secret string | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `PORT` | No | Server port (default: `5000`) | `5000` |
| `CLIENT_ORIGIN` | No | Allowed frontend origins (or `*`) | `https://your-frontend.vercel.app` or `*` |
| `NODE_ENV` | No | Environment mode | `production` |
| `DB_PATH` | No | Custom JSON database file path | `/data/db.json` |

### Frontend

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Decoupled only | URL of your deployed backend service | `https://prepai-backend.onrender.com` |

*(Leave `VITE_API_URL` empty when using Unified Full-Stack deployment or Docker)*

---

## Option 1: Unified Deployment on Render (Fastest & Free)

Render can build and run both the React frontend and Express backend from this repository as a single Web Service.

1. Push your repository to GitHub.
2. Sign in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Web Service** -> Connect your GitHub repository.
4. Configure the service:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. In the **Environment Variables** tab, add:
   - `JWT_SECRET`: *(Click "Generate" or paste a random 64-char string)*
   - `NODE_ENV`: `production`
   - `CLIENT_ORIGIN`: `*`
6. Click **Create Web Service**.

> Render will automatically build the frontend into `frontend/dist`, and the backend Express server will serve both the React SPA and API endpoints on the same port!

---

## Option 2: Unified Deployment on Railway

1. Push your repository to GitHub.
2. Go to [Railway](https://railway.app/) and create a **New Project** -> **Deploy from GitHub repo**.
3. Railway will detect `package.json` and `Procfile`.
4. In Railway project settings, add variables:
   - `JWT_SECRET`: `<your-random-secret>`
   - `NODE_ENV`: `production`
   - `CLIENT_ORIGIN`: `*`
5. Click **Deploy**.

---

## Option 3: Decoupled Deployment (Vercel Frontend + Render Backend)

### Step 1: Deploy Backend to Render or Railway
1. Create a Web Service pointing to `backend/`.
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Root Directory**: `backend`
2. Add environment variables:
   - `JWT_SECRET`: `<random-secret>`
   - `CLIENT_ORIGIN`: `https://your-project.vercel.app`
3. Copy your backend's public URL (e.g. `https://prepai-api.onrender.com`).

### Step 2: Deploy Frontend to Vercel
1. Import repository in [Vercel](https://vercel.com/).
2. Set **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://prepai-api.onrender.com`
5. Click **Deploy**.
*(Routing rewrites are already handled by `frontend/vercel.json`)*

---

## Option 4: Docker & Self-Hosted (Single Command)

A production-ready `Dockerfile` and `docker-compose.yml` are provided.

```bash
# Build and run container
docker compose up -d --build

# View logs
docker compose logs -f
```

The application will be accessible at `http://localhost:5000`.

---

## Verification & Health Check

The backend exposes a health check endpoint:
```http
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "uptime": 12.34,
  "timestamp": "2026-11-05T02:50:00.000Z"
}
```
