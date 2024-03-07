const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const User = require("./User");
// const verifyToken = require("./verifyToken");
const cookieParser = require("cookie-parser");
const Restaurant = require("./models/Restaurant");
const restaurantRoute = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

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
app.use("/restaurant", restaurantRoute);
app.use("/order", orderRoutes);

//
const PORT = process.env.PORT_ONE || 3002;

app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});
