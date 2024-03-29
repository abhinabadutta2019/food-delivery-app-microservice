const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken");

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Password Incorrect" });
  }

  const payload = {
    name: user.userName,
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Set token as cookie
      res.cookie("token", token, { httpOnly: true });

      // Return response with token in the headers
      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    }
  );
});

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  if (userName.length < 5 || password.length < 5) {
    return res.status(400).json({
      message: "Username or password is too short",
    });
  }

  const userExists = await User.findOne({ userName });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    const newUser = new User({
      userName,
      password,
      role: "normal",
    });
    newUser.save();
    return res.json(newUser);
  }
});

router.get("/profile", verifyToken, (req, res) => {
  // Access user details from request object
  res.json(req.user);
});

module.exports = router;
