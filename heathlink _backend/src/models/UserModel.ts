import mongoose, { Document, Schema, Types } from "mongoose";

interface UserInterface extends Document {
  fullname: string;
  email: string;
  password: string;
  designation: "doctor" | "patient";
}

const UserSchema: Schema = new Schema<UserInterface>({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String, enum: ["doctor", "patient"], required: true },
});

export const UserModel = mongoose.model<UserInterface>("User", UserSchema);
