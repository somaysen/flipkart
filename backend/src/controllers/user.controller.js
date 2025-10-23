const UserModel = require("../models/user.model")
const cacheInstance = require("../services/cache.service");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/mail.service");
const resetPassTemplate = require("../utils/email.template");


const registerController = async(req, res) =>{
    
    try {

        const {name,email,password,mobile} = req.body;

        if(!name || !email || !password || !mobile){
            return res.status(404).json({
                message:"All fierds are required",
            });
        }

        const existingUser = await UserModel.findOne({email})

        if(existingUser){
            return res.status(422).json({
                message:"User is exists",
            })
        }

        let newUser = await UserModel.create({
            name,
            email,
            password,
            mobile,
        })

        let token = newUser.generateToken()

        res.cookie("token",token);


        return res.status(201).json({
            message:"User is created",
            uers:newUser
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

        res.cookie("token",token);

        return res.status(200).json({
            message:"user logged in",
            user:user
        });
        
    } catch (error) {
        console.log("Intrnal server error => ",error);
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

    const rawToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2min",
    });

    const resetLink = `http://localhost:3000/api/auth/reset-password/${rawToken}`;
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


module.exports = {
    registerController,
    loginController,
    logoutController,
    forgetpassController,
}