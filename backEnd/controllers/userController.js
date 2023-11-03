// const User = require("../models/User");

// // Create a new user
// exports.createUser = (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const newUser = new User({
//     username,
//     email,
//     password, // Be sure to hash the password before saving it in a real-world app
//   });

//   newUser.save((err, user) => {
//     if (err) {
//       return res.status(500).json({ error: "Error creating the user" });
//     }
//     return res.status(201).json(user);
//   });
// };

// // Get a list of all users
// exports.getUsers = (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       return res.status(500).json({ error: "Error retrieving users" });
//     }
//     return res.status(200).json(users);
//   });
// };

// // Get a single user by ID
// exports.getUserById = (req, res) => {
//   const userId = req.params.id;

//   User.findById(userId, (err, user) => {
//     if (err) {
//       return res.status(500).json({ error: "Error retrieving the user" });
//     }
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.status(200).json(user);
//   });
// };

// // Update an existing user by ID
// exports.updateUser = (req, res) => {
//   const userId = req.params.id;
//   const updatedUserData = req.body;

//   User.findByIdAndUpdate(
//     userId,
//     updatedUserData,
//     { new: true },
//     (err, updatedUser) => {
//       if (err) {
//         return res.status(500).json({ error: "Error updating the user" });
//       }
//       if (!updatedUser) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       return res.status(200).json(updatedUser);
//     }
//   );
// };

// // Delete a user by ID
// exports.deleteUser = (req, res) => {
//   const userId = req.params.id;

//   User.findByIdAndRemove(userId, (err, removedUser) => {
//     if (err) {
//       return res.status(500).json({ error: "Error deleting the user" });
//     }
//     if (!removedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.status(204).send();
//   });
// };
