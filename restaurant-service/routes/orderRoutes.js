const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

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

router.put("/status/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Find the order by its ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
