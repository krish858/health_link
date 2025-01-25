import { Request, Response } from "express";
import axios from "axios";

export const AiChat = async (req: Request, res: Response) => {
  try {
    const { chats } = req.body;
    const response = await axios.post(
      "https://diagnosis-api-17qa.onrender.com/trigger-flow",
      {
        inputValue: chats,
      }
    );
    res.json({
      aiResponse: response.data.output,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to process request",
    });
  }
};
