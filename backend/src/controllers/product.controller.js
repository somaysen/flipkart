import ProdectModel from "../models/product.model.js";
import sendFilesToStorage from "../services/storage.service.js";

class ProductController {
  // Create a Product
  create = async (req, res) => {
    try {
      const { title, description, amount, currency } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images are required" });
      }

      if (!title || !description || amount === undefined || amount === null) {
        return res
          .status(400)
          .json({ message: "Title, description and amount are required" });
      }

      const parsedAmount = Number(amount);
      if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be a positive number" });
      }

      const allowedCurrencies = ["INR", "USD", "EUR"];
      const finalCurrency = (currency && String(currency).toUpperCase()) || "INR";
      if (!allowedCurrencies.includes(finalCurrency)) {
        return res.status(400).json({
          message: `Currency must be one of: ${allowedCurrencies.join(", ")}`,
        });
      }

      const uploadedImgUrl = await Promise.all(
        req.files.map(async (elem) => {
          const result = await sendFilesToStorage(
            elem.buffer,
            elem.originalname
          );
          const url = result?.url || result?.secure_url || result?.Location || null;
          if (!url) throw new Error("Failed to upload image");
          return url;
        })
      );

      // Get seller ID from middleware
      const user_id = req.seller?._id || req.user?._id;
      if (!user_id) {
        return res
          .status(400)
          .json({
            message: "User ID not found (check sellerValid middleware)",
          });
      }

      const newProduct = await ProdectModel.create({
        Seller_id: user_id,
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

  getAll = async (req, res) => {
    try {
      const products = await ProdectModel.find();
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  // View products for authenticated seller
  getForSeller = async (req, res) => {
    try {
      const user_id = req.seller?._id || req.user?._id;
      if (!user_id) return res.status(401).json({ message: "Unauthorized" });

      const products = await ProdectModel.find({ Seller_id: user_id });
      return res.status(200).json({
        message: "Seller products fetched successfully",
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  update = async (req, res) => {
    try {
      const prodect_id = req.params._id;
      const { title, description, amount, currency } = req.body;

      if (!prodect_id)
        return res.status(404).json({ message: "Product id is required" });

      const product = await ProdectModel.findById(prodect_id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      let uploadedImg = [];
      if (req.files && req.files.length > 0) {
        uploadedImg = await Promise.all(
          req.files.map(async (elem) => {
            const result = await sendFilesToStorage(
              elem.buffer,
              elem.originalname
            );
            const url =
              result?.url || result?.secure_url || result?.Location || null;
            if (!url) throw new Error("Failed to upload image");
            return url;
          })
        );
      }

      const updatedProduct = await ProdectModel.findByIdAndUpdate(
        prodect_id,
        {
          title: title || product.title,
          description: description || product.description,
          price: {
            amount: amount || product.price.amount,
            currency: currency || product.price.currency,
          },
          images: uploadedImg.length > 0 ? uploadedImg : product.images,
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

  remove = async (req, res) => {
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

  details = async (req, res) => {
    try {
      const id = req.params.id || req.params._id;
      if (!id)
        return res.status(404).json({ message: "Product id is required" });

      const product = await ProdectModel.findById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.status(200).json({ message: "Product details", product });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
}

const productController = new ProductController();

export const productCreateController = productController.create;
export const prodectGetController = productController.getAll;
export const prodectGetForSellerController = productController.getForSeller;
export const prodectUpdateController = productController.update;
export const prodectDeleteController = productController.remove;
export const prodectDetailsController = productController.details;
