const express = require("express");
const router = express.Router();
const upload = require("../db/multer");
const sellerAuth = require("../middlewares/seller.middleware");
const {authMiddleware} = require("../middlewares/auth.middlewar");

const {
  productCreateController,
  prodectGetController,
  prodectGetForSellerController,
  prodectUpdateController,
  prodectDeleteController,
  prodectDetailsController,
} = require("../controllers/product.controller");


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

module.exports = router;
