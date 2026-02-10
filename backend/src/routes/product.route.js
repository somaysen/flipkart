import express from "express";
const router = express.Router();
import upload from "../db/multer.js";
import sellerAuth from "../middlewares/seller.middleware.js";
import {authMiddleware} from "../middlewares/auth.middlewar.js";

import {
  productCreateController,
  prodectGetController,
  prodectGetForSellerController,
  prodectUpdateController,
  prodectDeleteController,
  prodectDetailsController,
} from "../controllers/product.controller.js";


router.post(
  "/create-product",
  sellerAuth,
  upload.array("images", 5),
  productCreateController
); //it's working seller only

router.get("/products", prodectGetController);// it working both seller and user 
router.get("/seller/products", sellerAuth, prodectGetForSellerController);//IT IS WORKING for seller only
router.patch("/products/:_id", sellerAuth, upload.array("images", 5), prodectUpdateController);//IT IS WORKING for seller only
router.delete("/products/:_id", sellerAuth, prodectDeleteController);//IT IS WORKING for seller only
router.get("/details/:id",authMiddleware , prodectDetailsController);//IT IS WORKING for both seller and user 

export default router;
