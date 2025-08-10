import express from "express";

const router = express.Router();

// TEMP: GET routes so you can test in the browser
router.get("/login", (req, res) => res.send("Login GET ok"));
router.get("/register", (req, res) => res.send("Register GET ok"));

export default router;
