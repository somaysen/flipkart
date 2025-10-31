const UserModel = require("../models/user.model")
const cacheInstance = require("../services/cache.service");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/mail.service");
const resetPassTemplate = require("../utils/email.template");
const ProductModel = require("../models/product.model");


const registerController = async(req, res) =>{
    
    try {

        const {name,email,password,mobile} = req.body;

        if(!name || !email || !password || !mobile){
            return res.status(404).json({
                message:"All fields are required",
            });
        }

        const existingUser = await UserModel.findOne({email})

        if(existingUser){
            return res.status(422).json({
                message:"User already exists",
            })
        }

        let newUser = await UserModel.create({
            name,
            email,
            password,
            mobile,
        })

        let token = newUser.generateToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(201).json({
            message:"User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
            },
            token
        })

    } catch (error) {
        console.error("Error in registerController:", error);
        return res.status(500).json({
        message: "Internal server error",
        error: error.message,
        })
    
    }
}

const loginController = async(req,res) =>{
    try {

         const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
        }

        const userpass = await user.comparePass(password)

        if(!userpass){
            return res.status(400).json({
                message:"Invalid credentials",
            });
        };

        const token = user.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message:"User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
            token
        });
        
    } catch (error) {
        console.error("Internal server error in loginController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logoutController = async(req,res) =>{
    try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    let mama = await cacheInstance.set(token, "blacklisted");

    res.clearCookie("token");

    console.log(mama)

    return res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    console.log("error in a logout",error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
}

const forgetpassController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rawToken = jwt.sign({ id: user._id }, process.env.JWT_RAW_SECRET, {
      expiresIn: "10min",
    });

    const resetLink = `http://localhost:3000/api/user/reset-password/${rawToken}`;
    const emailTemplate = resetPassTemplate(user.name, resetLink);

    await sendMail(user.email, "Reset Your Password", emailTemplate);

    return res.status(200).json({
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.error("Error in forget password controller:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addToCartController = async (req, res) => {
  try {
    const productId = req.product?._id;
    const quantity = Number(req.body?.quantity);

    if (!productId) return res.status(400).json({ message: "productId is required" });
    if (quantity < 1) return res.status(400).json({ message: "quantity must be at least 1" });

    const product = req.product || await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await UserModel.findById(req.user?._id);
    if (!user) return res.status(401).json({ message: "User not found or unauthorized" });

    const amount = Number(product.price?.amount ?? product.amount ?? 0);
    const currency = product.price?.currency || product.currency || "INR";
    if (amount <= 0) return res.status(400).json({ message: "Invalid product price" });

    user.cart ||= [];

    const existingItem = user.cart.find(i => i.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * amount;
    } else {
      user.cart.push({
        product: productId,
        quantity,
        price: { amount, currency },
        total: quantity * amount,
      });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    console.error("❌ addToCartController error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const userUpdatedcontroller = async (req, res) => {
  try {
    const authenticatedUser = req.user;
    if (!authenticatedUser?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = authenticatedUser._id;
    const { name, mobile, email, password } = req.body || {};

    // Nothing to update
    if (!name && !mobile && !email && !password) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Load user document to leverage pre-save hooks (e.g., password hashing)
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Email change: ensure uniqueness
    if (email && email !== user.email) {
      const existing = await UserModel.findOne({ email });
      if (existing) {
        return res.status(422).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    if (typeof mobile !== "undefined") {
      user.mobile = mobile;
    }

    if (typeof password === "string") {
      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }
      user.password = password; // will be hashed by pre-save hook
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error in userUpdatedcontroller:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}; 




module.exports = {
  registerController,
  loginController,
  logoutController,
  forgetpassController,
  addToCartController,
  userUpdatedcontroller
};