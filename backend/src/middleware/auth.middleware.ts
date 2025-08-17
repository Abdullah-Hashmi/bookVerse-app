import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { userId: string };
    // Note: Assuming your token payload includes { userId } based on generateToken

    // Find user
    const user = await User.findById(decoded.userId); // Use userId instead of id
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
