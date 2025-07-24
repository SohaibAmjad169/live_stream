
import mongoose from "mongoose";

const SalesBreakSchema = new mongoose.Schema({
  livestreamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LiveStream",
    required: true,
  },
  title: String,
  description: String,
  items: [String], // Could be item names or product IDs
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SalesBreak || mongoose.model("SalesBreak", SalesBreakSchema);
