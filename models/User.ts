// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  contactEmail?: string;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  companyName: { type: String },
  contactEmail: { type: String },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
