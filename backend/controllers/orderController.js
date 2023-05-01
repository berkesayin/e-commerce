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

// @desc     Update order to paid
// @route    GET /api/orders/:id/pay
// @access   Private route (token needed)

// function to update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // fetch orders
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true; // the default value is false
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc     Get logged in user orders
// @route    GET /api/orders/myorders
// @access   Private route (token needed)

// function to get logged in user's orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
