import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in .env. Copy backend/.env.example to backend/.env and add your MongoDB connection string.");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};