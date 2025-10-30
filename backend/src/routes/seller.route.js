const express = require("express");
const { registerSeller, loginSeller, logoutSeller, sellerProducts } = require("../controllers/seller.controller");
const {sellerMiddewar} = require("../middlewares/seller.middleware");
const router = express.Router();

router.post("/register" ,registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/seller-prodect/:id",sellerMiddewar,sellerProducts)

module.exports = router;
