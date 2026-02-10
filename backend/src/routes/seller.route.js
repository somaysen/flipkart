import express from "express";
import { registerSeller, loginSeller, logoutSeller, sellerProducts, verifySeller } from "../controllers/seller.controller.js";
import sellerAuth from "../middlewares/seller.middleware.js";
const router = express.Router();

router.post("/register" ,registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/seller-prodect/:id", sellerAuth, sellerProducts)
router.get("/verify-session", sellerAuth, verifySeller);

export default router;
