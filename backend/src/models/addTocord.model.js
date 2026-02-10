import mongoose from "mongoose";

const AddTocardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, enum: ["INR", "USD", "EUR"], default: "INR" },
    },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

const AddToCardModel = mongoose.model("AddToCard", AddTocardSchema);
export default AddToCardModel;