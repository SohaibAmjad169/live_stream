// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  contactEmail?: string;
  role: "admin" | "user" | "super_admin" | "seller";
  companyId?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  companyName: { type: String },
  contactEmail: { type: String },
  role: {
    type: String,
    enum: ["admin", "user", "super_admin", "seller"],
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
