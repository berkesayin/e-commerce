import express from "express";
const router = express.Router(); // express.js Router özelliği
import { getProducts, getProductById } from '../controllers/productController.js'


// creating the route to get all the products as json (we use at HomeScreen)
// router.get("/", getProducts);
router.route('/').get(getProducts);


// creating the route to get specific product by product._id as json (we use at ProductScreen)
router.route('/:id').get(getProductById);


export default router;  
