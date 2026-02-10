import express from "express";
import { registerController,
  loginController,
  logoutController,
  forgetpassController,
  addToCartController,
  userUpdatedcontroller, 
  verifyResetToken,
  resetPasswordController} from "../controllers/user.controller.js";
import { authMiddleware, AddToCartMiddleware } from "../middlewares/auth.middlewar.js";
const router = express.Router();


import {sendEmailOtpController,verifyEmailOtpController,changeEmailController} from "../controllers/Update.controller.js";

router.post("/register",registerController);
router.post("/login",loginController);
router.post("/logout",authMiddleware,logoutController);


router.post("/forget-password",forgetpassController);
router.get("/reset-password/:token", verifyResetToken);
router.post("/reset-password",resetPasswordController)



router.post("/add-to-cart/:productId", authMiddleware, AddToCartMiddleware, addToCartController);
router.post("/user-Update",authMiddleware,userUpdatedcontroller);

// Email change routes (matching frontend paths)
router.post("/email-change/request-otp", authMiddleware, sendEmailOtpController);
router.post("/email-change/verify-otp", authMiddleware, verifyEmailOtpController);
router.post("/email-change", authMiddleware, changeEmailController);

// Legacy routes (keeping for backward compatibility)
router.post("/send-email-otp/:id", authMiddleware, sendEmailOtpController);
router.post("/verify-email-otp/:id", authMiddleware, verifyEmailOtpController);
router.post("/change-email/:id", authMiddleware, changeEmailController);



export default router;