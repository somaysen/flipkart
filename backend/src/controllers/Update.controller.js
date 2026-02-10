import UserModel from "../models/user.model.js";
import sendMail from "../services/mail.service.js"; // adjust path as needed
const otpStore = {};

const sendEmailOtpController = async (req, res) => {
    try {
        // Use user from authMiddleware instead of params
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userId = String(user._id);
        const otp = Math.floor(100000 + Math.random()*900000);
        // Store OTP with user ID for better security
        otpStore[userId] = otp;

        const html= `<div style="font-family: Arial; padding: 10px;">
            <h2>Email change verification</h2>
            <p>Your OTP to verify your email change request is: </p>
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

const verifyEmailOtpController = async (req, res) => {
    try {
        // Use user from authMiddleware
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({
                message: "OTP is required"
            });
        }

        const userId = String(user._id);
        if (otpStore[userId] && Number(otpStore[userId]) === Number(otp)) {
            user.isOtpVerified = true;
            await user.save();
            delete otpStore[userId];
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
        // Use user from authMiddleware
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { newEmail, otp } = req.body;

        if (!newEmail) {
            return res.status(400).json({ message: "newEmail is required" });
        }

        // Verify OTP if provided (frontend sends it)
        if (otp) {
            const userId = String(user._id);
            if (!otpStore[userId] || Number(otpStore[userId]) !== Number(otp)) {
                return res.status(400).json({ message: "Invalid OTP" });
            }
            delete otpStore[userId];
        } else if (!user.isOtpVerified) {
            return res.status(400).json({ message: "OTP not verified" });
        }

        const normalizedNewEmail = String(newEmail).trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedNewEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
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
  
        return res.json({ 
            message: "Email changed successfully", 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
  
  

export {sendEmailOtpController,verifyEmailOtpController,changeEmailController};