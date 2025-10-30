const express = require("express");
const router = express.Router();
const upload = require("../db/multer");
const { sellerValid } = require("../middlewares/seller.middleware");

const {
  prodectCreateController,
  prodectGetController,
  prodectUpdateController,
  prodectDeleteController
} = require("../controllers/product.controller");

// ✅ Create a product (multiple images)
router.post(
  "/create-product",
  sellerValid,
  upload.array("images", 5), // allow up to 5 files (adjust as needed)
  prodectCreateController
);

router.get("/products", prodectGetController);
router.patch("/products/:_id",sellerValid,upload.single("image"),prodectUpdateController);
router.delete("/products/:_id", sellerValid, prodectDeleteController);

module.exports = router;
