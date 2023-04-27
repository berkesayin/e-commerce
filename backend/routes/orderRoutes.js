import express from "express";
const router = express.Router(); // express.js Router özelliği
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems); // => POST /api/orders
router.route("/:id").get(protect, getOrderById); // => GET /api/orders/:id
router.route("/:id/pay").put(protect, updateOrderToPaid); // => PUT /api/orders/:id/pay

export default router;
