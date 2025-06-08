import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export function createSessionToken(address: string) {
  return jwt.sign({ address }, JWT_SECRET, { expiresIn: "12h" });
}

export function verifySessionToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { address: string };
    return payload.address;
  } catch {
    return null;
  }
}
