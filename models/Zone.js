import mongoose from "mongoose";

const ZoneSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "Please provide country"],
      minlength: 2,
      trim: true,
    },
    state: {
      type: String,
      required: [true, "Please provide state"],
      minlength: 2,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
      minlength: 2,
      trim: true,
    },
    agent: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

export default mongoose.model("Zone", ZoneSchema);
