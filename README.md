# Todo App

A full-stack todo app: React frontend (Vite) and Express backend (Node + MongoDB).

## How to run

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and set:

- **MONGO_URI** – your MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **JWT_SECRET** – any long random string (optional for local dev; a default is used if omitted)

Then start the backend:

```bash
npm run dev
```

The API runs at **http://localhost:3000**.

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Open the URL shown (usually **http://localhost:5173**). The app talks to the backend at `http://localhost:3000/api`.

### 3. Use the app

- Register a new account → log in → create boards → add todos and mark them done.

---

## “Cannot reach server. Is the backend running at http://localhost:3000?”

That message means the **frontend cannot connect to the backend**. Do this:

1. **Start the backend in its own terminal** (leave it running):
   ```bash
   cd backend
   npm run dev
   ```
   Or from the project root: `npm run backend`

2. **Check the backend output:**
   - You should see **“MongoDB connected”** then **“Server running on port 3000”**.
   - If you see an **error** (e.g. about `MONGO_URI`, `ENOTFOUND`, or connection), the server never starts. Fix `backend/.env`:
     - Set **MONGO_URI** to your full Atlas connection string (host like `cluster0.xxxxx.mongodb.net`, not `cluster.mongodb.net`).
     - In Atlas: **Network Access** → allow `0.0.0.0/0` (or your IP).
   - If the backend exits right away, fix the error it prints, then run `npm run dev` again.

3. **Confirm the backend is up:**  
   Open **http://localhost:3000/api** in your browser. You should get a response (e.g. 404 is OK; “Cannot GET /api” or similar means the server is running). If the page never loads, the backend is not running on port 3000.

4. **Then start the frontend** (in a **second** terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Or from the project root: `npm run frontend`

**Summary:** The backend must be running and show “Server running on port 3000” before you use the app. If MongoDB fails, the backend won’t start; fix `MONGO_URI` in `backend/.env` and try again.
