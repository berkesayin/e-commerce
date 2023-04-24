import express from "express";
const router = express.Router(); // express.js Router özelliği
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);    // => POST /api/orders
router.route('/:id').get(protect, getOrderById);   // => GET /api/orders/:id

export default router;
