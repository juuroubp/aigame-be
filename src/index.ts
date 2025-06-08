import express from "express";
import dotenv from "dotenv";
import { router as startGameRouter } from "./routes/start.js";
import { router as finalizeRouter } from "./routes/finalize.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", startGameRouter);
app.use("/api", finalizeRouter);

app.listen(3001, () => {
  console.log("✅ Server running at http://localhost:3001");
});
