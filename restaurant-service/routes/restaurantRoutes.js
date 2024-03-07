const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get restaurant by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new restaurant
router.post("/", async (req, res) => {
  const { name, items, online } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      items,
      online,
    });

    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update restaurant
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, items, online } = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        name,
        items,
        online,
      },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete restaurant
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
