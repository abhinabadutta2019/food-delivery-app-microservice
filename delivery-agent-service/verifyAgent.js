const jwt = require("jsonwebtoken");
const User = require("./models/User");

// Middleware to verify JWT token and check if the user is an agent
const verifyAgent = async (req, res, next) => {
  // Extract token from request cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch user details from database using decoded token data
    const user = await User.findOne({ userName: decoded.name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the user is an agent
    if (user.role !== "agent") {
      return res
        .status(403)
        .json({ message: "Access forbidden for non-agent users" });
    }
    // Attach user details to request object
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

module.exports = verifyAgent;
