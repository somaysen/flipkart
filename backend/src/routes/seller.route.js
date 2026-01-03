const express = require("express");
const { registerSeller, loginSeller, logoutSeller, sellerProducts, verifySeller } = require("../controllers/seller.controller");
const sellerAuth = require("../middlewares/seller.middleware");
const router = express.Router();

router.post("/register" ,registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/seller-prodect/:id", sellerAuth, sellerProducts)
router.get("/verify-session", sellerAuth, verifySeller);

module.exports = router;
