const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      required: true,
    },
     product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
    },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔍 Compare password
sellerSchema.methods.comparePass = async function (password) {
  return bcrypt.compare(password, this.password);
};

// 🎫 Generate JWT token
sellerSchema.methods.generateToken = function (expiresIn = "1d") {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

module.exports = mongoose.model("Seller", sellerSchema);
