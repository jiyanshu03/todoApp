import { Todo } from "../models/Todo.js";
import { Board } from "../models/Board.js";

export const createTodo = async (req, res) => {
  const board = await Board.findOne({
    _id: req.params.boardId,
    userId: req.user.id
  });
  if (!board) return res.status(404).json({ message: "Board not found" });
  const todo = await Todo.create({
    title: req.body.title,
    boardId: req.params.boardId,
    userId: req.user.id
  });
  res.status(201).json(todo);
};

export const getTodos = async (req, res) => {
  res.json(await Todo.find({ boardId: req.params.boardId, userId: req.user.id }));
};

export const updateTodo = async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Todo not found" });
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
};