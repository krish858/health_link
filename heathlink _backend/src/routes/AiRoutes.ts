import { Router } from "express";
import { AiChat } from "../controllers/AiController";

const router = Router();

router.post("/chat", AiChat);

export default router;
