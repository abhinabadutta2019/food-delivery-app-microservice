const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  }, // Reference to the Restaurant model
  items: [{ item: String, quantity: Number }], // Array of items in the order
  total: { type: Number, required: true }, // Total price of the order
  status: {
    type: String,
    enum: ["pending", "accept", "reject", "delivered"],
    default: "pending",
  }, // Status of the order
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the order was created
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
