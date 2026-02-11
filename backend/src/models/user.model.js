import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      maxLength: 10,
      minLength: 10,
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
    // store cart line items directly on the user to simplify addToCart logic
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1, min: 1 },
        price: { type: Number, required: true }, // snapshot of price at time of adding
        total: { type: Number, required: true },
      },
    ],

    // allow users to have multiple orders
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
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
export default UserModel;
