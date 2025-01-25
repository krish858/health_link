import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL || "";

const dbconnect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected");
  } catch (e) {
    console.error(`error message ${e}`);
  }
};

export default dbconnect;
