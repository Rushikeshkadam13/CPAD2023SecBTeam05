const mongoose = require("mongoose");

//schema for the Expense model
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
  uid: {
    type: String,
    required: true,
  },
  userBalances: {
    type: [
      {
        uid: {
          type: String,
          required: true,
        },
        balance: {
          type: Number,
          required: true,
        },
      },
    ]
  },
 
});

// Create the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
