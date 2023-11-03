const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

// Get a list of all users
router.get("/", userController.getUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update an existing user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
