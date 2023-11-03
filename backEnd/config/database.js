// config/database.js

const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/"; // Replace with your actual database URI

// Connect to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listeners for database connection
db.on("connected", () => {
  console.log(`Connected to the database on ${dbURI}`);
});

db.on("error", (err) => {
  console.error(`Database connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});
db.collection("expenses");
// Export the Mongoose instance
module.exports = mongoose;
