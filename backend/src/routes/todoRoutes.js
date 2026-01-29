import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controller/todoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const todoRoutes = Router();
todoRoutes.post("/:boardId", authMiddleware, createTodo);
todoRoutes.get("/:boardId", authMiddleware, getTodos);
todoRoutes.put("/:id", authMiddleware, updateTodo);
todoRoutes.delete("/:id", authMiddleware, deleteTodo);