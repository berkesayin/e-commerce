import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router(); // express.js Router özelliği
import Product from "../models/productModel.js";

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public route (No token needed)

// creating the function to get all the products as json (we use at HomeScreen)
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public

// creating the function to get specific product by product._id as json (we use at ProductScreen)
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { getProducts, getProductById, deleteProduct };
