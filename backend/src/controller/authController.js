import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ email: req.body.email, password: hash });
  res.json({ message: "User registered" });
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok)
    return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};