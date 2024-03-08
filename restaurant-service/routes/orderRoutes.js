const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Route to view all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.put("/status/:id", async (req, res) => {
//   const orderId = req.params.id;
//   const { status } = req.body;

//   try {
//     // Find the order by its ID and update the status
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status: status },
//       { new: true } // Return the updated order
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.put("/status/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order status is not pending" });
    }

    // Find a random available agent
    const agent = await User.findOne({ role: "agent", available: true });

    if (!agent) {
      return res.status(404).json({ message: "No available agent found" });
    }

    // Update the order status and assign it to the agent
    order.status = status;
    order.agent = agent._id;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
