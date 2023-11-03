// const Expense = require("../models/Expense");

// // Create a new expense
// exports.createExpense = (req, res) => {
//   const { title, description, amount, payer, participants, date } = req.body;

//   if (!title || !amount || !payer || !participants || !date) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const newExpense = new Expense({
//     title,
//     description,
//     amount,
//     payer,
//     participants,
//     date,
//   });

//   newExpense.save((err, expense) => {
//     if (err) {
//       return res.status(500).json({ error: "Error creating the expense" });
//     }
//     return res.status(201).json(expense);
//   });
// };

// // Get a list of all expenses
// // exports.getExpenses = (req, res) => {
// //   Expense.find({}, (err, expenses) => {
// //     if (err) {
// //       return res.status(500).json({ error: "Error retrieving expenses" });
// //     }
// //     return res.status(200).json(expenses);
// //   });
// // };

// exports.getExpenses = (req, res) => {
//   Expense.find({}, (err, expenses) => {
//     if (err) {
//       return res.status(500).json({ error: "Error retrieving expenses" });
//     }
//     console.log("API called successfully");
//     return res.status(200).json(expenses);
//   });
// };

// // Get a single expense by ID
// exports.getExpenseById = (req, res) => {
//   const expenseId = req.params.id;

//   Expense.findById(expenseId, (err, expense) => {
//     if (err) {
//       return res.status(500).json({ error: "Error retrieving the expense" });
//     }
//     if (!expense) {
//       return res.status(404).json({ error: "Expense not found" });
//     }
//     return res.status(200).json(expense);
//   });
// };

// // Update an existing expense by ID
// exports.updateExpense = (req, res) => {
//   const expenseId = req.params.id;
//   const updatedExpenseData = req.body;

//   Expense.findByIdAndUpdate(
//     expenseId,
//     updatedExpenseData,
//     { new: true },
//     (err, updatedExpense) => {
//       if (err) {
//         return res.status(500).json({ error: "Error updating the expense" });
//       }
//       if (!updatedExpense) {
//         return res.status(404).json({ error: "Expense not found" });
//       }
//       return res.status(200).json(updatedExpense);
//     }
//   );
// };

// // Delete an expense by ID
// exports.deleteExpense = (req, res) => {
//   const expenseId = req.params.id;

//   Expense.findByIdAndRemove(expenseId, (err, removedExpense) => {
//     if (err) {
//       return res.status(500).json({ error: "Error deleting the expense" });
//     }
//     if (!removedExpense) {
//       return res.status(404).json({ error: "Expense not found" });
//     }
//     return res.status(204).send();
//   });
// };
