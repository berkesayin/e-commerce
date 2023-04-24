import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router(); // express.js Router özelliği
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc     Create new order
// @route    POST /api/orders
// @access   Private route (token needed)

// function to create new order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400); // Bad Request
    throw new Error("No order items!");
    return;
  } else {
    // Create new order in database
    const order = new Order({
      orderItems,
      user: req.user._id, // attach logged in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private route (token needed)

// function to get an order by ID
const getOrderById = asyncHandler(async (req, res) => {
  // fetch orders
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

export { addOrderItems, getOrderById };
