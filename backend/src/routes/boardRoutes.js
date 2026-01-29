import { Router } from "express";
import { createBoard, getBoards, deleteBoard } from "../controller/boardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const boardRoutes = Router();
boardRoutes.post("/", authMiddleware, createBoard);
boardRoutes.get("/", authMiddleware, getBoards);
boardRoutes.delete("/:id", authMiddleware, deleteBoard);