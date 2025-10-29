const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "DOLLAR"], // ✅ Fixed enum
        default: "INR",
      },
    },
    images: {
      type: [String], // ✅ URL array
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Should start with capital & match model name
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
