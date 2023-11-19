const mongoose = require("mongoose");

//schema for the User model
const groupSchema = new mongoose.Schema({
  groupTitle: {
    type: String,
    required: true,
  },
  groupDescription: {
    type: String,
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
    ],
    required: true,
  },
  paymentGraph: {
    type: [
      {
        sender: {
          type: String,
          required: true,
        },
        receiver: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  expenses: {
    type: [String],
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
});

// Create the User model
const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
