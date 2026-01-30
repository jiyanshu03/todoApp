import { Board } from "../models/Board.js";

export const createBoard = async (req, res) => {
  const board = await Board.create({
    name: req.body.name,
    userId: req.user.id
  });
  res.json(board);
};

export const getBoards = async (req, res) => {
  res.json(await Board.find({ userId: req.user.id }));
};

export const deleteBoard = async (req, res) => {
  const board = await Board.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });
  if (!board) return res.status(404).json({ message: "Board not found" });
  res.json({ message: "Board deleted" });
};