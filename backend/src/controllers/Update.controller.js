const UserModel = require("../models/user.model");
const sendMail = require("../services/mail.service"); // adjust path as needed
const otpStore = {};

const sendEmailOtpController = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "User id is required",
            });
        }

        console.log("user.id", id);

        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({
            message: "User not found",
        });

        const otp = Math.floor(100000 + Math.random()*900000);
        otpStore[user.email] = otp;

        const html= `<div style="font-family: Arial; padding: 10px;">
            <h2>Email change verification</h2>
            <p>Your OTP to verify you email change request is: </p>
            <h3 style="color:#2c7;">${otp}</h3>
            <p>This OTP will expire in 5 minutes.</p>
        </div>`

        await sendMail(user.email, "Verify Your Email Change", html);

        return res.json({ message: "OTP sent successfully" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const  verifyEmailOtpController = async (req, res) => {
    try {
        const {id} = req.params;
        const { otp } = req.body;

        if(!id) return res.status(400).json({
            message:"User id is required"
        })

        console.log(id)

        const user = await UserModel.findById(id);
        
        if (!user) return res.status(404).json({
             message: "User not found" 
        });
    
        if (otpStore[user.email] && Number(otpStore[user.email]) === Number(otp)) {
            user.isOtpVerified = true;
            await user.save();
            delete otpStore[user.email];
            return res.json({ message: "OTP verified successfully" });
        }
    
        return res.status(400).json({ message: "Invalid or expired OTP" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        }
  };

  const changeEmailController = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) return res.status(400).json({
            message:"User id is required"
        })

      const { newEmail } = req.body;

      if (!newEmail) {
        return res.status(400).json({ message: "newEmail is required" });
      }

      const normalizedNewEmail = String(newEmail).trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedNewEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.isOtpVerified) {
        return res.status(400).json({ message: "OTP not verified" });
      }

      if (user.email && user.email.toLowerCase() === normalizedNewEmail) {
        return res.status(400).json({ message: "New email is the same as current email" });
      }

      const existing = await UserModel.findOne({ email: normalizedNewEmail });
      if (existing && String(existing._id) !== String(user._id)) {
        return res.status(409).json({ message: "Email already in use" });
      }

      user.email = normalizedNewEmail;
      user.isOtpVerified = false;
      await user.save();
  
      return res.json({ message: "Email changed successfully", newEmail: user.email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  

module.exports = {sendEmailOtpController,verifyEmailOtpController,changeEmailController}