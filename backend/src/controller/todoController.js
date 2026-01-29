import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  res.json(await Todo.create({
    title: req.body.title,
    boardId: req.params.boardId,
    userId: req.user.id
  }));
};

export const getTodos = async (req, res) => {
  res.json(await Todo.find({ boardId: req.params.boardId }));
};

export const updateTodo = async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Todo updated" });
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};