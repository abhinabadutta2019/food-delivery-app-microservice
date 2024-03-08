const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyAgent = require("../verifyAgent");

router.get("/", verifyAgent, async (req, res) => {
  try {
    const agentId = req.user._id; // Get the agent ID from the authenticated user

    // Find all orders where the agent ID matches the ID passed with the middleware
    const orders = await Order.find({ agent: agentId });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/deliver/:id", verifyAgent, async (req, res) => {
  try {
    const orderId = req.params.id;
    const agentId = req.user._id; // Get the agent ID from the authenticated user

    // Find the order by its ID and the agent ID matches the ID passed with the middleware
    const order = await Order.findOne({ _id: orderId, agent: agentId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "accept") {
      order.status = "delivered";
      await order.save();
      return res.json({ message: "You have confirmed order delivered" });
    } else if (order.status === "delivered") {
      return res.json({ message: "Order already delivered" });
    } else {
      return res.json({ message: "Order not needed to be delivered" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
