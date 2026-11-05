# PrepAI 🚀

An AI-powered interview preparation and CBT examination platform with real-time video interview practice, AI evaluation, and comprehensive study planning.

## 🌟 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Lucide React, Chart.js, Socket.io-client
- **Backend**: Node.js, Express 5, Socket.io (WebRTC signalling), JWT Authentication, bcryptjs
- **Database**: Mock JSON storage with seed questions and users
- **Deployment**: Render, Railway, Vercel, Docker

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. Quick Start

Install dependencies for both frontend and backend:
```bash
npm run install:all
```

Configure backend environment variables:
```bash
# In backend/.env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
JWT_SECRET=your-random-secret-key
```

Run both services:
```bash
# Terminal 1 - Start backend
npm run dev:backend

# Terminal 2 - Start frontend
npm run dev:frontend
```

Frontend runs on [http://localhost:5173](http://localhost:5173)  
Backend runs on [http://localhost:5000](http://localhost:5000)

---

## 🚀 Deployment

PrepAI is configured for one-click deployment on **Render**, **Railway**, **Vercel**, or **Docker**:

- **Unified Full-Stack Deployment** (Render / Railway / Docker):
  Run `npm run build` then `npm start`. Both frontend and backend run as a single service on port 5000 with no CORS issues.
- **Decoupled Deployment** (Vercel + Render):
  Deploy `frontend/` to Vercel and `backend/` to Render. `vercel.json` and `_redirects` are pre-configured for client-side routing.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full step-by-step guides.
