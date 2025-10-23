const ProdectModel = require("../models/prodect.model");
const sendFilesToStorage = require("../services/storage.service")
const mongoose = require("mongoose");


const prodectCreateController = async (req, res) => {
   try {
    let { title, description, amount, currency } = req.body;

    if (!req.files)
      return res.status(404).json({
        message: "Images is required",
      });

      console.log(req.files)

    if (!title || !description || !amount || !currency)
      return res.status(404).json({
        message: "All fields are required",
      });

    let uploadedImgUrl = await Promise.all(
      req.files.map(async (elem) => {
        return await sendFilesToStorage(elem.buffer, elem.originalname);
      })
    );

    console.log(uploadedImgUrl);

    let newProduct = await ProdectModel.create({
      title,
      description,
      price: {
        amount,
        currency,
      },
      images: uploadedImgUrl.map((elem) => elem.url),
    });

    return res.status(201).json({
      message: "product created successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
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
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const prodectUpdateController = async (req, res) => {
  try {
    let prodect_id = req.params._id;
    let { title, description, amount, currency } = req.body;

    if (!prodect_id)
      return res.status(404).json({
        message: "Product id is required",
      });

    let product = await ProdectModel.findById(prodect_id);

    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    let uploadedImg;

    if (req.files) {
      uploadedImg = await Promise.all(
        req.files.map(async (elem) => {
          return await sendFilesToStorage(elem.buffer, elem.originalname);
        })
      );
    }

    let updatedProduct = await ProductModel.findByIdAndUpdate(
      {
        _id: product_id,
      },
      {
        title,
        description,
        price: {
          amount,
          currency,
        },
        images: uploadedImg.map((elem) => elem.url),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};


const prodectDeleteController = async (req, res) => {
  try {
    
    const prodect_id = req.params._id;

    if (!prodect_id) {
      return res.status(404).json({
        message: "Product id is required",
      });
    }

    const delProdect = await ProdectModel.findByIdAndDelete(prodect_id);

    if (!delProdect) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
      
      return res.status(200).json({
        message: "Product deleted successfully",
        product: delProdect,
      });

  } catch (error) {
    console.log("Error in prodectDeleteController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};


module.exports = {
  prodectCreateController,
  prodectGetController,
  prodectUpdateController,
  prodectDeleteController,
};
