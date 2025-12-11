import mongoose, { Document, Model, Schema } from "mongoose";
import { Role } from "../types/appuser";

export interface IAppUserDoc extends Document {
  userId: string;
  email: string;
  name?: string;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
}

const AppUserSchema = new Schema<IAppUserDoc>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const AppUser: Model<IAppUserDoc> =
  mongoose.models.AppUser ||
  mongoose.model<IAppUserDoc>("AppUser", AppUserSchema);
