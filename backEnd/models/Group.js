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
    ]
  },
  paymentGraph: {
    type: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
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
  expenses: {
    type: [String]
  },
  users: {
    type: [String],
    required: true,
  },
});

// Create the User model
const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
