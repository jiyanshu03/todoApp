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


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);