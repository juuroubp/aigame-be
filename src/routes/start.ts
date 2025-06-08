import express, { Request, Response } from "express";
import { createSessionToken } from "../utils/auth";

export const router = express.Router();

router.post("/start-game", (req: Request, res: Response) => {
  const { address } = req.body;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Invalid or missing wallet address" });
  }

  try {
    const sessionToken = createSessionToken(address);
    return res.status(200).json({ sessionToken });
  } catch (err) {
    console.error("Error creating session token:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
