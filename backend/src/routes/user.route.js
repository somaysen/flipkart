const express = require("express");
const { registerController,
  loginController,
  logoutController,
  forgetpassController,
  addToCartController,
  userUpdatedcontroller } = require("../controllers/user.controller");
const { authMiddleware, AddToCartMiddleware } = require("../middlewares/auth.middlewar");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {sendEmailOtpController,verifyEmailOtpController,changeEmailController} = require("../controllers/Update.controller")

router.get("/",authMiddleware,(req,res)=>{
    res.send("user route is working")
})

router.post("/register",registerController);
router.post("/login",loginController);
router.post("/logout",authMiddleware,logoutController);


router.post("/forget-password",forgetpassController);

router.get("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_RAW_SECRET);

    // If successful, render reset password form
    return res.render("index.ejs", { user_id: decoded.id });

  } catch (error) {
    console.error("Invalid or expired token:", error);

    // Token expired or invalid
    return res.status(401).json({
      message: "Invalid or expired token. Please request a new reset link.",
    });
  }
});


router.post("/add-to-cart/:productId", authMiddleware, AddToCartMiddleware, addToCartController);
router.post("/user-Update",authMiddleware,userUpdatedcontroller);

router.post("/send-email-otp/:id",authMiddleware,sendEmailOtpController);
router.post("/verify-email-otp/:id",authMiddleware,verifyEmailOtpController);
router.post("/change-email/:id",authMiddleware,changeEmailController);



module.exports = router;