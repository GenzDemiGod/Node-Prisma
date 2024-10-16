import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
// Middleware to parse JSON
app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!!");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
