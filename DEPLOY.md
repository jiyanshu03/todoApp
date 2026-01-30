# How to Deploy the Todo App on Vercel

You will create **two Vercel projects** (backend and frontend) from the same repo. Deploy the backend first, then the frontend, and connect them with an env variable.

---

## Prerequisites

- **GitHub (or GitLab/Bitbucket)** – repo pushed with this code
- **MongoDB** – a database (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)
- **Vercel account** – [vercel.com](https://vercel.com)

---

## Step 1: Get your MongoDB connection string

1. In [MongoDB Atlas](https://cloud.mongodb.com), create a cluster (or use an existing one).
2. **Database Access** → Add user (username + password).
3. **Network Access** → Add IP: `0.0.0.0/0` (allow from anywhere; required for Vercel).
4. **Connect** → **Connect your application** → copy the connection string.
5. Replace `<password>` in the string with the user’s password.  
   Example: `mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`  
   Keep this for the next step.

---

## Step 2: Deploy the backend

1. Open **[vercel.com/new](https://vercel.com/new)**.
2. **Import** your Git repository (e.g. GitHub).
3. **Configure Project:**
   - **Root Directory:** click **Edit** → set to **`backend`** → **Continue**.
   - **Framework Preset:** leave as **Other**.
   - **Build Command:** leave empty (or set to `echo 'no build'` if Vercel shows an error).
   - **Output Directory:** leave empty (the backend is a serverless API, not a static site).
4. **Environment Variables:**
   - **Name:** `MONGO_URI`  
   - **Value:** your full MongoDB connection string from Step 1  
   - **Environment:** Production (and Preview if you want).
5. Click **Deploy** and wait for it to finish.
6. When it’s done, open the deployment URL (e.g. `https://todo-app-backend-xxxx.vercel.app`).
7. In the browser, go to **`https://<your-backend-url>/api`**.  
   You should see: `{"ok":true,"message":"Todo API"}`.  
8. **Copy the backend URL** (e.g. `https://todo-app-backend-xxxx.vercel.app`) – you need it for the frontend.  
   The frontend will call **`<backend-url>/api`** (with `/api` at the end).

---

## Step 3: Deploy the frontend

1. Open **[vercel.com/new](https://vercel.com/new)** again (new project).
2. **Import** the **same** Git repository.
3. **Configure Project:**
   - **Root Directory:** click **Edit** → set to **`frontend`** → **Continue**.
   - **Framework Preset:** should auto-detect **Vite**.
   - **Build and Output:** leave defaults.
4. **Environment Variables:**
   - **Name:** `VITE_API_URL`  
   - **Value:** backend URL from Step 2 **+ `/api`**, **no trailing slash**  
     Example: `https://todo-app-backend-xxxx.vercel.app/api`  
   - **Environment:** Production (and Preview if you want).
5. Click **Deploy** and wait for it to finish.
6. Open the frontend deployment URL and try **Register** → **Login** → create a board.  
   It should talk to the backend; if it doesn’t, see **Troubleshooting** below.

---

## Step 4: Redeploy after changing env vars

- **Backend:** if you change `MONGO_URI` (or any backend env var), go to the backend project → **Deployments** → **Redeploy** (or push a new commit).
- **Frontend:** Vite bakes `VITE_*` into the build. If you add or change `VITE_API_URL`, you **must** trigger a new deploy (Redeploy or push a commit). The old build will still use the old URL until you redeploy.

---

## Troubleshooting

**Frontend still calls localhost**

- `VITE_API_URL` is only used at **build time**. Set it in the frontend project’s **Environment Variables**, then **Redeploy** the frontend (don’t just save the env var).

**Wrong backend URL**

- `VITE_API_URL` must be exactly: `https://<your-backend>.vercel.app/api` (with `/api`, no trailing slash).
- Test in the browser: open `https://<your-backend>.vercel.app/api` – you must see `{"ok":true,"message":"Todo API"}`.

**CORS errors in the browser**

- Backend is configured to allow your frontend origin. Redeploy the backend after pulling the latest code.

**Network tab**

- In DevTools → **Network**, check the request URL when you log in or load boards. It should be `https://<your-backend>.vercel.app/api/...`, not `http://localhost:3000/api/...`.

---

## Local development

- **Backend:** create `backend/.env` from `backend/.env.example`, set `MONGO_URI`, then run `cd backend && npm run dev`.
- **Frontend:** `frontend/.env` exists for local use; leave `VITE_API_URL` unset so it uses `http://localhost:3000/api`. Run `cd frontend && npm run dev`.

No code changes are needed to switch between local and production; the frontend uses `VITE_API_URL` when set (production) and falls back to localhost in dev.
