const UserModel = require("../models/user.model");
const cacheInstance = require("../services/cache.service");
const jwt = require("jsonwebtoken");
const ProductModel = require("../models/product.model");

const authMiddleware = async (req, res, next) => {
  
  try {
    let token = req.cookies.token;
    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    let isBlacklisted = await cacheInstance.get(token);

    if (isBlacklisted)
      return res.status(400).json({
        message: "Token blacklisted",
      });

    let decode = await jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware", error);
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

const AddToCartMiddleware = async (req, res, next) => {
  try {
    let productId = req.params.productId;
    if (!productId)
      return res.status(404).json({
        message: "Product ID not found",
      });
    let product = await ProductModel.findById(productId);
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });
    req.product = product;
    next();
  } catch (error) {
    console.log("Error in AddToCartMiddleware", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


module.exports = {authMiddleware,AddToCartMiddleware};