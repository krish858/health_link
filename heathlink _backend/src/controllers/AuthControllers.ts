import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SignupSchema, SigninSchema } from "../types/types";
import { UserModel } from "../models/UserModel";
import dotenv from "dotenv";

dotenv.config();

export const Signup = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;
  try {
    const validate = SignupSchema.safeParse(req.body);
    if (!validate.success) {
      return res.json({
        msg: "ZOD ERROR",
      });
    }
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.json({
        msg: "User already exists",
      });
    }
    const user = new UserModel({
      fullname,
      email,
      password,
      designation: "patient",
    });
    await user.save();
    const token = jwt.sign(
      { name: fullname, email: email, designation: "patient" },
      process.env.JWT_SECRET!
    );
    return res.json({
      msg: "success",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error",
      error: error,
    });
  }
};

export const Signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const validate = SigninSchema.safeParse(req.body);
    if (!validate.success) {
      return res.json({
        msg: "ZOD ERROR",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        msg: "User not found",
      });
    }
    if (user.password !== password) {
      return res.json({
        msg: "Invalid password",
      });
    }
    const token = jwt.sign(
      { name: user.fullname, email: user.email, designation: user.designation },
      process.env.JWT_SECRET!
    );
    return res.json({
      msg: "success",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error",
      error: error,
    });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    if (!user) {
      return res.json({
        msg: "Invalid token",
      });
    }
    return res.json({
      msg: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error",
      error: error,
    });
  }
};
