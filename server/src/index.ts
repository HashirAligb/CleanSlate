import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

app.get("/", (req: Request, res: Response) => {
  res.send("CleanSlate API is live with TypeScript!");
});

app.post("/greet", (req: Request<{}, {}, { name: string }>, res: Response) => {
  const { name } = req.body; 

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  res.json({ message: `Hello, ${name}!` });
}); 

app.get("/time", (_req: Request, res: Response) => {
  const now = new Date().toLocaleString();
  res.json({ currentTime: now });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});