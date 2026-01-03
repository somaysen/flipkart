const jwt = require("jsonwebtoken");
const sellerModel = require("../models/seller.model");
const cacheInstance = require("../services/cache.service");

// Helper: Extract token from Authorization header
const extractBearerToken = (req) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
};

// Main Seller Auth Middleware
const sellerAuth = async (req, res, next) => {
  try {
  const token = extractBearerToken(req) || req.cookies?.sellerToken;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    // console.log(token);

    // Check if token is blacklisted
    const isBlacklisted = await cacheInstance.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token blacklisted" });
    }

    // console.log(isBlacklisted);

    // Verify token using SAME secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_SELLER);
    if(!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // console.log('decoded');

    const seller = await sellerModel.findById(decoded.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // console.log(seller);

    req.seller = seller;
    req.user = seller; // optional for backward compatibility
    next();
  } catch (error) {
    console.error("Error in sellerAuth middleware:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = sellerAuth;
