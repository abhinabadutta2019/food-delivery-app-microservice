const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, minlength: 5 },
  password: { type: String, required: true, minlength: 5 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
