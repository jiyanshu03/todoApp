import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.ObjectId
});

export const Board = mongoose.model("Board", boardSchema);