const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ✅ was misspelled as 'uniqes'
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, 
    },
    mobile: {
      type: Number, 
      required: true,
      maxlength: 10,
      minlength: 10,
    },
     isAdmin: {
      type: Boolean,
      default: false,
    },
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"seller",
      default: null,
    },
    cart: [
      {
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
          currency: { type: String, enum: ["INR", "DOLLAR"], default: "INR" },
        },
        total: { type: Number, required: true },
      },
    ],
    orders: {
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
      ],
    },
  },
  { timestamps: true } 
);


userSchema.pre("save", async function (next) {
 
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🎫 Generate JWT token
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // ✅ use something like "1d" instead of just 10 (seconds)
  );
  return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
