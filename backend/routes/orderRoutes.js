import express from "express";
const router = express.Router(); // express.js Router özelliği
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems); // => POST /api/orders

export default router;
