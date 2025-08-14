import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// TEMP: GET routes so you can test in the browser
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;
    const user = new User({ username, email, password, profileImage });
    await user.save();
    // generate token
    const Token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      token: Token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", (req, res) => res.send("Login GET ok"));

export default router;
