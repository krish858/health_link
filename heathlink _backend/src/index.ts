import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import Authroutes from "./routes/Authroutes";
import dbconnect from "./utils/DbConnect";
import AiChatRoutes from "./routes/AiRoutes";

const app = express();
const port = 3000;

dbconnect();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", Authroutes);
app.use("/api/v1/ai", AiChatRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "hello world",
  });
});

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
