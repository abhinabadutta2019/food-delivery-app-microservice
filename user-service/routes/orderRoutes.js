const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../verifyToken");

// Create order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { _id, items } = req.body;
    const userId = req.user._id; // Get the user ID from the authenticated user

    // Check if items array is empty or not provided
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items array is empty or not provided" });
    }

    // Calculate the total price based on items and their quantities
    const total = items.reduce((acc, item) => {
      // Check if item price and quantity are provided
      if (!item.price || !item.quantity) {
        throw new Error("Item price or quantity not provided");
      }
      return acc + item.price * item.quantity;
    }, 0);

    // Create a new order
    const order = new Order({
      user: userId,
      restaurant: _id,
      items: items,
      total: total,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user's order list
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated user

    // Find orders belonging to the user
    const orders = await Order.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
