import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {getCartProducts, addToCart, removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js'

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/cart", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;