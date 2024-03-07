const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const User = require("./User");
// const verifyToken = require("./verifyToken");
const cookieParser = require("cookie-parser");
const Restaurant = require("./Restaurant");

app.use(express.json());
dotenv.config();
app.use(cookieParser());

let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/microservice-food-delivery-mar-24?retryWrites=true&w=majority`;
//
async function connectToMongoDB() {
  try {
    //if mongoDB uri is correct
    //if it is connected
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    //if error in connection or - in mongoDB uri
    console.error("MongoDB connection error:", error);
  }
}
// Call the async function to connect to MongoDB
connectToMongoDB();
//
// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
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
app.post("/restaurants", async (req, res) => {
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
app.put("/restaurants/:id", async (req, res) => {
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
app.delete("/restaurants/:id", async (req, res) => {
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

//
const PORT = process.env.PORT_ONE || 3002;

app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});
