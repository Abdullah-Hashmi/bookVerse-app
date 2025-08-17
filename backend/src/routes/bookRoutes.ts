import express, { Request, Response } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectRoute,async (req: Request, res: Response) => {
  try {
    const { title, caption, image, rating } = req.body;
    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //    upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // save book to database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Book creation error:", error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
