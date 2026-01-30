import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // On Vercel, don't exit so the function can return a proper error response
    if (!process.env.VERCEL) process.exit(1);
  }
};