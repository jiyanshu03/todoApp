import dotenv from "dotenv";
dotenv.config();

// So login works locally without setting JWT_SECRET (dev only)
if (!process.env.JWT_SECRET && process.env.NODE_ENV !== "production") {
  process.env.JWT_SECRET = "dev-secret-change-in-production";
  console.warn("Using default JWT_SECRET. Set JWT_SECRET in .env for production.");
}

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { boardRoutes } from "./routes/boardRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Todo API", docs: "/api" });
});

// Health check - so you can verify the backend is running
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Todo API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

// Error handler - must be before 404 handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

// 404 handler - catch routes that don't exist (must be last)
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

const PORT = process.env.PORT || 3000;

// Start server only after MongoDB is connected so auth works
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Cannot start server:", err.message);
    console.error("Check MONGO_URI in backend/.env (see backend/.env.example)");
    process.exit(1);
  });