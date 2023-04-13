import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router(); // express.js Router özelliği
import Order from "../models/orderModel.js";

// @desc     Create new order
// @route    POST /api/orders
// @access   Private route (token needed)

// function to create new order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddresss,
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
      shippingAddresss,
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

export { addOrderItems };
