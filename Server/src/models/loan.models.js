import mongoose from "mongoose";
const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["PENDING", "APPROVED", "PAID", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Loan = mongoose.model("Loan", loanSchema);
