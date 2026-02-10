import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewar.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
} from "../controllers/addToCard.controller.js";

const router = express.Router();

// All routes require authentication
router.post("/addToCart", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;
