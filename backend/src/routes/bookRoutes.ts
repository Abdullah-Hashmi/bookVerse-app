import express, { Request, Response } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const { title, caption, image, rating } = req.body;
    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //    upload image to cloudinary

    // save book to database
  } catch (error) {}
});

export default router;
