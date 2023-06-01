import express from "express";
const router = express.Router(); // express.js Router özelliği
import {
  getProducts,
  getProductById,
  deleteProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


// creating the route to get all the products as json (we use at HomeScreen)
// router.get("/", getProducts);
router.route("/").get(getProducts);

// creating the route to get specific product by product._id as json (we use at ProductScreen)
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
 