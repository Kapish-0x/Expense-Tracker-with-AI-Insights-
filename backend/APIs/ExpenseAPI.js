import exp from "express";
import { ExpenseModel } from "../models/ExpenseModel.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";

export const expenseApp = exp.Router();


// ADD EXPENSE
expenseApp.post("/expense",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const newExpense = new ExpenseModel({...req.body,userId: userIdOfToken,});
      const savedExpense = await newExpense.save();
      res.status(201).json({message: "Expense added",payload: savedExpense,});
    } catch (err) {
      res.status(500).json({message: err.message,});
    }
  });


// GET ALL EXPENSES
expenseApp.get("/expenses",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const expensesList = await ExpenseModel.find({userId: userIdOfToken,}).sort({ date: -1 });
      res.status(200).json({message: "Expenses",payload: expensesList});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });


// GET SINGLE EXPENSE
expenseApp.get("/expense/:id",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      const expense = await ExpenseModel.findOne({_id: expenseId,userId: userIdOfToken,});

      res.status(200).json({message: "Expense",payload: expense});
    } catch (err) {
      res.status(500).json({message: err.message,});
    }
  });


// UPDATE EXPENSE
expenseApp.put("/expense/:id",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      const updatedExpense = await ExpenseModel.findOneAndUpdate({_id: expenseId,userId: userIdOfToken},req.body,{ new: true });
        res.status(200).json({message: "Expense updated",payload: updatedExpense,});
    } catch (err) {
      res.status(500).json({message: err.message,});
    }
  });


// DELETE EXPENSE
expenseApp.delete("/expense/:id",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      await ExpenseModel.findOneAndDelete({_id: expenseId,userId: userIdOfToken,});

      res.status(200).json({message: "Expense deleted",});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });




  //Dashboard kind of thing

  expenseApp.get("/summary",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const expenses = await ExpenseModel.find({userId: userIdOfToken,});
      let income = 0;
      let expense = 0;

      expenses.forEach((item) => {
        if (item.type === "INCOME") income += item.amount;
        else expense += item.amount;
      });
      const savings = income - expense;

      res.status(200).json({message: "summary",payload: {income,expense,savings,}});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });