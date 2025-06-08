import express from "express";
import { verifySessionToken } from "../utils/auth";
import { finalizeTryOnChain } from "../utils/blockchain";

export const router = express.Router();

router.post("/finalize", async (req, res) => {
  const { sessionToken, didWin } = req.body;

  if (!sessionToken || typeof didWin !== "boolean") {
    return res.status(400).json({ error: "Missing sessionToken or didWin" });
  }

  const address = verifySessionToken(sessionToken);
  if (!address) {
    return res.status(401).json({ error: "Invalid or expired session token" });
  }

  try {
    const txHash = await finalizeTryOnChain(address, didWin);
    return res.status(200).json({ success: true, txHash });
  } catch (err: any) {
    console.error("Error finalizing try:", err);
    return res.status(500).json({ error: "Failed to finalize try" });
  }
});
