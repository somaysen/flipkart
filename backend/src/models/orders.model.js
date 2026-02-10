import mongoose from "mongoose";

const OderSchema = new mongoose.Schema({
  type: Array,
  default: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      total: {
        type: Number,
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
    },
    { timestamps: true },
  ],
});


const oderModel = mongoose.model("Oder",OderSchema);
export default oderModel;