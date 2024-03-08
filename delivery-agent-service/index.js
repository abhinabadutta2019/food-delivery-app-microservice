const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
dotenv.config();
app.use(cookieParser());

// Connect to MongoDB
///////mongoDB cloud//////////////////
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
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT_ONE || 3003;

app.listen(PORT, () => {
  console.log(`Delivery Agent Service running on port ${PORT}`);
});
