import express from "express";
const router = express.Router(); // express.js Router özelliği

import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc     Fetch all products 
// @route    GET /api/products
// @access   Public route (No token needed)

// creating the route to get all the products as json (we use at HomeScreen)
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc     Fetch all product
// @route    GET /api/products/:id
// @access   Public 

// creating the route to get specific product by product._id as json (we use at ProductScreen)
router.get("/:id", asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found!' });
  }
}));

export default router;  
