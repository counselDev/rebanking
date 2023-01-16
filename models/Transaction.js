import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    zone: {
      type: mongoose.Types.ObjectId,
      ref: "Zone",
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    agent: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
