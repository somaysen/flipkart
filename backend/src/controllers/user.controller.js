import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import cacheInstance from "../services/cache.service.js";
import sendMail from "../services/mail.service.js";
import resetPassTemplate from "../utils/email.template.js";
import crypto from "crypto";

class UserController {
  // Helper method for cookie configuration
  getCookieConfig = () => {
    const isProduction = process.env.NODE_ENV === "production";
    
    return {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: isProduction, // HTTPS only in production
      sameSite: isProduction ? "none" : "lax", // Adjust for cross-site in production
      path: "/",
      ...(isProduction && process.env.FRONTEND_URL && { 
        domain: process.env.FRONTEND_URL 
      })
    };
  };

  register = async (req, res) => {
    try {
      const { name, email, password, mobile } = req.body;

      if (!name || !email || !password || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ message: "User already exists" });
      }

      const user = await UserModel.create({
        name,
        email,
        password,
        mobile,
      });

      const token = user.generateToken();

      // Use proper cookie config
      res.cookie("token", token, this.getCookieConfig());

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
        token,
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.comparePass(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = user.generateToken();

      // Use proper cookie config
      res.cookie("token", token, this.getCookieConfig());

      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  logout = async (req, res) => {
    try {
      const token = req.cookies?.token;

      if (token) {
        await cacheInstance.set(token, "blacklisted");
      }

      // Clear cookie with same config used for setting
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        ...(process.env.NODE_ENV === "production" && process.env.DOMAIN_NAME && { 
          domain: process.env.DOMAIN_NAME 
        })
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // ... rest of your methods remain the same
  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Hash token
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      await user.save({ validateBeforeSave: false });

      const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:5174").replace(/\/$/, "");
      const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

      const emailTemplate = resetPassTemplate(user.name, resetLink);
      await sendMail(user.email, "Reset Your Password", emailTemplate);

      res.status(200).json({
        message: "Reset password link sent to your email",
      });
    } catch (error) {
      console.error("Forget password error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  resetPassword = async (req, res) => {
    try {
      // accept token from body (preferred), query, or params (covers proxy rewrites)
      const token =
        req.body?.token || req.query?.token || req.params?.token || null;
      const { newPassword } = req.body || {};

      if (!token || !newPassword) {
        return res.status(400).json({
          message: "Token and new password are required",
        });
      }

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await UserModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid or expired reset token",
        });
      }

      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  /* ================= VERIFY RESET TOKEN ================= */
  verifyResetToken = async (req, res) => {
    try {
      // accept token from params, query, or body
      const token =
        req.params?.token || req.query?.token || req.body?.token || null;
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await UserModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid or expired reset token" });
      }

      return res.status(200).json({
        message: "Token verified successfully",
        userId: user._id,
      });
    } catch (error) {
      console.error("Verify reset token error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  /* ================= UPDATE USER ================= */
  update = async (req, res) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { name, email, mobile, password } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (email && email !== user.email) {
        const exists = await UserModel.findOne({ email });
        if (exists) {
          return res.status(422).json({ message: "Email already in use" });
        }
        user.email = email;
      }

      if (name) user.name = name;
      if (mobile) user.mobile = mobile;
      if (password) user.password = password;

      await user.save();

      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  /* ================= ADD TO CART ================= */
  addToCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const quantity = Number(req.body.quantity);

      if (!productId || quantity < 1) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // normalize price to a number so it matches the cart schema
      const price =
        typeof product.price === "object"
          ? product.price?.amount
          : product.price ?? product.amount;

      if (Number.isNaN(Number(price)) || price == null) {
        return res
          .status(400)
          .json({ message: "Product price unavailable, cannot add to cart" });
      }

      const item = user.cart.find(
        (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
        item.total = item.quantity * price;
      } else {
        user.cart.push({
          product: productId,
          quantity,
          price,
          total: quantity * price,
        });
      }

      await user.save();

      res.status(200).json({
        message: "Product added to cart",
        cart: user.cart,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

const userController = new UserController();

export const registerController = userController.register;
export const loginController = userController.login;
export const logoutController = userController.logout;
export const forgetpassController = userController.forgetPassword;
export const resetPasswordController = userController.resetPassword;
export const verifyResetToken = userController.verifyResetToken;
export const userUpdatedcontroller = userController.update;
export const addToCartController = userController.addToCart;
