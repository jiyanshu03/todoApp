import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { boardRoutes } from "./routes/boardRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";

const app = express();

connectDB();

// Reflect request origin so browsers allow requests with Authorization header (no wildcard with credentials).
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Root: so visiting the backend URL doesn’t show "Cannot GET /"
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Todo API", docs: "/api" });
});

// Health check: open this URL in a browser to confirm the backend is reachable
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Todo API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

// Global error handler: prevents unhandled errors from returning 500 with no body
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

// On Vercel, the platform runs the app; locally we start the server.
if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

export default app;