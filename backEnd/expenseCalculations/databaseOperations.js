const express = require("express");
const router = express.Router();
const userModel = require("../models/Users");
const groupModel = require("../models/Group");
const expenseController = require("../controllers/expenseController");
const expenseModel = require("../models/Expense");
const expenseCalculator = require("../expenseCalculations/expenseCalculator");

this.addExpenseToGroup = async function (gid, eid) {
    const existingGroup = await groupModel.findById(gid);
    existingGroup.expenses.push(eid);
    await existingGroup.save();
}

this.addGroupUnderUser = async function (users, gid) {
    for (var uid of users) {
        const existingUser = await userModel.findOne({ uid });
        existingUser.groups.push(gid);
        await existingUser.save();
        console.log(existingUser)
    }
}

this.getExpenses = async function (gid) {
    
}

this.getGroups = async function (uid) {

}

this.addPaymentGraph = async function (gid) {

}

module.exports = this;