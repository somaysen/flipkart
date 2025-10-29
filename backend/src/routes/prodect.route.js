const express = require("express");
const router = express.Router();
const upload = require("../db/multer");
const {
  prodectCreateController,
  prodectGetController,
  prodectUpdateController,
  prodectDeleteController
} = require("../controllers/prodect.controller");

router.post("/create-product", upload, prodectCreateController);

router.get("/products", prodectGetController);
router.patch("/products/:_id", upload, prodectUpdateController);
router.delete("/products/:_id", prodectDeleteController);

module.exports = router;
