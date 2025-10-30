const express = require("express");
const router = express.Router();
const upload = require("../db/multer");
const { sellerAuth } = require("../middlewares/seller.middleware");
const {
  prodectCreateController,
  prodectGetController,
  prodectGetForSellerController,
  prodectUpdateController,
  prodectDeleteController,
} = require("../controllers/product.controller");

router.post(
  "/create-product",
  sellerAuth,
  upload.array("images", 5),
  prodectCreateController
);

router.get("/products", prodectGetController);
router.get("/seller/products", sellerAuth, prodectGetForSellerController);
router.patch("/products/:_id", sellerAuth, upload.array("images", 5), prodectUpdateController);
router.delete("/products/:_id", sellerAuth, prodectDeleteController);

module.exports = router;
