const productModel = require("../models/product.model"); // import your Product model
const sellerModel = require("../models/seller.model");

async function registerSeller(req, res) {
  try {
    const { name, email, password, phone, address, contactName } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !address || !contactName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing account
    const existingSeller = await sellerModel.findOne({ email });
    if (existingSeller) {
      return res
        .status(400)
        .json({ message: "Food partner account already exists" });
    }

    // Create seller (password will auto-hash via pre-save)
    const seller = await sellerModel.create({
      name,
      email,
      password,
      phone,
      address,
      contactName,
    });

    // Generate JWT token (valid for 7 days)
    const token = seller.generateToken("7d");

    // Set cookie securely
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Food partner registered successfully",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        contactName: seller.contactName,
      },
      token
    });
  } catch (error) {
    console.error("Error in registerSeller ==>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginSeller(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const seller = await sellerModel.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const isValidPassword = await seller.comparePass(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = seller.generateToken("7d");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Seller logged in successfully",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        contactName: seller.contactName,
      },
      token
    });
  } catch (error) {
    console.error("Error in loginSeller ==>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


function logoutSeller(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logout successful" });
}


// 📦 Get all products for a specific seller
async function sellerProducts(req, res) {
  try {
    const { id } = req.params; // route uses /seller/:id

    // the product schema stores the seller reference in `user_id`
    const products = await productModel.find({ user_id: id });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller" });
    }

    return res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}



module.exports = { registerSeller, loginSeller, logoutSeller,sellerProducts };
