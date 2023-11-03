const mongoose = require("mongoose");

// Define the schema for the Expense model
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  payer: {
    type: String, // You can customize the type based on your user model
    required: true,
  },
  participants: {
    type: [String], // You can customize the type based on your user model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
