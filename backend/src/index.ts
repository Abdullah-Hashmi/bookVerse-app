import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./lib/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Await connectDB to handle promise rejection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
