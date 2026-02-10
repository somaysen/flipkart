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
    cart: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"AddToCard",
    },

    orders: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Oder"
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
