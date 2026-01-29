import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  boardId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
});

export const Todo = mongoose.model("Todo", todoSchema);