const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const expenseModel = require("../models/Expense");
router.use(express.json());

// // Create a new expense
// router.post("/", expenseController.createExpense);

// Get a list of all expenses
router.get("/", async (req, res) => {
  try {
    const expense1 = await expenseModel.find();
    res.json(expense1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await expenseModel.findById(req.params.id);
    if (expense == null) {
      res.send("This Expense is not exist");
    } else {
      res.json(expense);
    }
  } catch (err) {
    res.send("Error" + err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const expense = await expenseModel.findById(req.params.id);
    expense.amount = req.body.amount;
    const a1 = await expense.save();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense = await expenseModel.findById(req.params.id);
    const a1 = await expense.deleteOne();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
  const Expense = new Expense({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
    payer: req.body.payer,
    participants: req.body.participants,
    date: req.body.date,
  });
  try {
    const expense = Expense.save();
    res.json(expense);
  } catch (err) {
    res.send("Error" + err);
  }
});

// Get a single expense by ID
// router.get("/:id", expenseController.getExpenseById);

// // Update an existing expense by ID
// router.put("/:id", expenseController.updateExpense);

// // Delete an expense by ID
// router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
