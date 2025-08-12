import express from "express";

const router = express.Router();

// TEMP: GET routes so you can test in the browser
router.post("/login", (req, res) => res.send("Login GET ok"));
router.post("/register", (req, res) => res.send("Register GET ok"));

export default router;
