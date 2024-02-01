const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  groups: {
    type: [String]
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
