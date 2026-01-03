const ProdectModel = require("../models/product.model");
const sendFilesToStorage = require("../services/storage.service");
const mongoose = require('mongoose')

// Create a Prodect

const productCreateController = async (req, res) => {
  try {
    const { title, description, amount, currency } = req.body;

    // Basic validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    if (!title || !description || amount === undefined || amount === null) {
      return res.status(400).json({ message: "Title, description and amount are required" });
    }

    // Numeric amount validation
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    // Currency validation (fallback to INR if not provided)
    const allowedCurrencies = ["INR", "USD", "EUR"];
    const finalCurrency = (currency && String(currency).toUpperCase()) || "INR";
    if (!allowedCurrencies.includes(finalCurrency)) {
      return res.status(400).json({ message: `Currency must be one of: ${allowedCurrencies.join(", ")}` });
    }

    // Upload images to storage service and normalize returned URL field
    const uploadedImgUrl = await Promise.all(
      req.files.map(async (elem) => {
        const result = await sendFilesToStorage(elem.buffer, elem.originalname);
        // storage service might return { url } or { secure_url } or { Location }
        const url = result?.url || result?.secure_url || result?.Location || null;
        if (!url) throw new Error("Failed to upload image");
        return url;
      })
    );

    // ✅ Get seller ID from middleware
    const user_id = req.seller?._id || req.user?._id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID not found (check sellerValid middleware)" });
    }

    const newProduct = await ProdectModel.create({
      Seller_id: user_id, // Use authenticated seller ID
      title: String(title).trim(),
      description: String(description).trim(),
      price: { amount: parsedAmount, currency: finalCurrency },
      images: uploadedImgUrl,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("productControl error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const prodectGetController = async (req, res) => {
  try {
    let products = await ProdectModel.find();
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// View products for authenticated seller
const prodectGetForSellerController = async (req, res) => {
  try {
    const user_id = req.seller?._id || req.user?._id;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });

    // query by Seller_id (matches product schema)
    const products = await ProdectModel.find({ Seller_id: user_id });
    return res.status(200).json({
      message: "Seller products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const prodectUpdateController = async (req, res) => {
  try {
    let prodect_id = req.params._id;
    let { title, description, amount, currency } = req.body;

    if (!prodect_id)
      return res.status(404).json({ message: "Product id is required" });

    let product = await ProdectModel.findById(prodect_id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let uploadedImg = [];

    if (req.files && req.files.length > 0) {
      // upload and normalize URLs like in create controller
      uploadedImg = await Promise.all(
        req.files.map(async (elem) => {
          const result = await sendFilesToStorage(elem.buffer, elem.originalname);
          const url = result?.url || result?.secure_url || result?.Location || null;
          if (!url) throw new Error("Failed to upload image");
          return url;
        })
      );
    }

    let updatedProduct = await ProdectModel.findByIdAndUpdate(
      prodect_id,
      {
        title: title || product.title,
        description: description || product.description,
        price: {
          amount: amount || product.price.amount,
          currency: currency || product.price.currency,
        },
        images:
          uploadedImg.length > 0 ? uploadedImg : product.images,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const prodectDeleteController = async (req, res) => {
  try {
    const prodect_id = req.params._id;

    if (!prodect_id)
      return res.status(404).json({ message: "Product id is required" });

    const delProdect = await ProdectModel.findByIdAndDelete(prodect_id);

    if (!delProdect)
      return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({
      message: "Product deleted successfully",
      product: delProdect,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const prodectDetailsController = async (req, res) => {
  try {
    const id = req.params.id || req.params._id;

    if (!id)
      return res.status(404).json({ message: "Product id is required" });

    

    const product = await   ProdectModel.findById(id);
    
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    

    return res.status(200).json({ message: "Product details", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  productCreateController,
  prodectGetController,
  prodectGetForSellerController,
  prodectUpdateController,
  prodectDeleteController,
  prodectDetailsController,
};
