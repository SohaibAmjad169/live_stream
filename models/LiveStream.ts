import mongoose, { Document, Schema } from "mongoose";

export interface ILiveStream extends Document {
  streamTitle: string;
  date: string;
  platform: string;
  sales: number;
  revenue: number;
  profit: number;
  status:
    | "Active"
    | "Completed"
    | "draft"
    | "denied"
    | "in-review"
    | "approved";
}

const LiveStreamSchema: Schema = new Schema({
  streamTitle: { type: String, required: true },
  date: { type: String, required: true },
  platform: { type: String, required: true },
  sales: { type: Number, required: true },
  revenue: { type: Number, required: true },
  profit: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Active", "Completed", "draft", "denied", "in-review", "approved"],
    required: true,
  },
});

export default mongoose.models.LiveStream ||
  mongoose.model<ILiveStream>("LiveStream", LiveStreamSchema);
