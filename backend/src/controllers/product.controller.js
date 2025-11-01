const ProdectModel = require("../models/product.model");
const sendFilesToStorage = require("../services/storage.service");
const mongoose = require('mongoose')

// Create a Prodect

const productCreateController = async (req, res) => {
  try {
    const { title, description, amount, currency } = req.body;

    if (!req.files || req.files.length === 0)
      return res.status(404).json({ message: "Images are required" });

    if (!title || !description || !amount || !currency)
      return res.status(404).json({ message: "All fields are required" });

    const uploadedImgUrl = await Promise.all(
      req.files.map(async (elem) => {
        return await sendFilesToStorage(elem.buffer, elem.originalname);
      })
    );

    // ✅ Get seller ID from middleware
    const user_id = req.seller?._id || req.user?._id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID not found (check sellerValid middleware)" });
    }

    const newProduct = await ProdectModel.create({
      user_id, // ✅ required field
      title,
      description,
      price: { amount, currency },
      images: uploadedImgUrl.map((elem) => elem.url),
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

    const products = await ProdectModel.find({ user_id });
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
      uploadedImg = await Promise.all(
        req.files.map(async (elem) => {
          return await sendFilesToStorage(elem.buffer, elem.originalname);
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
          uploadedImg.length > 0
            ? uploadedImg.map((elem) => elem.url)
            : product.images,
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
  prodectCreateController,
  prodectGetController,
  prodectGetForSellerController,
  prodectUpdateController,
  prodectDeleteController,
  prodectDetailsController,
};
