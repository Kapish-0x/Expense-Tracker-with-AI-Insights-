import exp from "express";
import { ExpenseModel } from "../models/ExpenseModel.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";
export const expenseApp = exp.Router();
import mongoose from "mongoose";
import { getFinancialAdvice } from "../Services/AIService.js";

expenseApp.post("/expense", VerifyToken("USER", "ADMIN"), async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ USER:", req.user);

  try {
    const userIdOfToken = req.user?.id;
    console.log("USER ID:", userIdOfToken);

    const { amount, type } = req.body;

    // Fix date format
    let expenseData = {
      ...req.body,
      userId: userIdOfToken,
    };

    if (expenseData.date) {
      const dateStr = expenseData.date;

      if (typeof dateStr === "string" && dateStr.includes("/")) {
        const [day, month, year] = dateStr.split("/");

        const fullYear =
          year.length === 2
            ? `20${year}`
            : year;

        expenseData.date = new Date(
          `${fullYear}-${month}-${day}`
        );
      } else {
        expenseData.date = new Date(dateStr);
      }

      // fallback if invalid date
      if (isNaN(expenseData.date.getTime())) {
        expenseData.date = new Date();
      }
    }

    // Save expense
    const newExpense = new ExpenseModel(expenseData);
    const savedExpense = await newExpense.save();
    console.log("SAVED:", savedExpense);

    // Update totals
    const updateField =
      type === "INCOME"
        ? { income: amount }
        : { expense: amount };

    const user = await UserModel.findByIdAndUpdate(
      userIdOfToken,
      { $inc: updateField },
      { returnDocument: "after" } // replaces deprecated { new: true }
    );

    console.log("UPDATED USER:", user);

    res.status(201).json({
      message:
        type === "INCOME"
          ? "Income added successfully"
          : "Expense added successfully",
      payload: savedExpense,
      user,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
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
      res.status(500).json({message: err.message});
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



  //charts purpose
  //expenses category

  expenseApp.get("/category-analytics",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      // aggregate category totals
      const analytics = await ExpenseModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userIdOfToken),
            type: "EXPENSE"
          }
        },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount"
            }
          }
        },
        {
          $sort: {
            total: -1
          }
        }
      ]);

      res.status(200).json({message: "Category analytics",payload: analytics});
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  });


  

  //monthly income vs expenses comparision chart 

  expenseApp.get("/income-expense-analytics",VerifyToken("USER", "ADMIN"),async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const analytics = await ExpenseModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userIdOfToken),
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              type: "$type",
            },
            total: { $sum: "$amount" },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

      res.status(200).json({message: "Income vs Expense analytics",payload: analytics,});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });

  //predict next month expenses

  expenseApp.get(
  "/predict-expense",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      // group monthly expenses
      const monthlyExpenses = await ExpenseModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userIdOfToken),
            type: "EXPENSE"
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" }
            },
            total: {
              $sum: "$amount"
            }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        }
      ]);

      // calculate average
     let predicted = 0;

// take only last 3 months
const recentMonths = monthlyExpenses.slice(-3);

if (recentMonths.length > 0) {
  const sum = recentMonths.reduce(
    (acc, item) => acc + item.total,
    0
  );

  predicted = Math.round(sum / recentMonths.length);
}

      res.status(200).json({
  message: "Predicted next month expense",
  payload: {
    consideredMonths: recentMonths,
    predicted
  }
});

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);



//AI insights

expenseApp.get(
  "/ai-insights",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const transactions = await ExpenseModel.find({
        userId: userIdOfToken,
      });

      let income = 0;
      let expense = 0;
      let categoryTotals = {};

      transactions.forEach((item) => {
        if (item.type === "INCOME") {
          income += item.amount;
        } else {
          expense += item.amount;
          categoryTotals[item.category] =
            (categoryTotals[item.category] || 0) + item.amount;
        }
      });

      const savings = income - expense;

      let topCategory = "OTHERS";
      let max = 0;

      for (let category in categoryTotals) {
        if (categoryTotals[category] > max) {
          max = categoryTotals[category];
          topCategory = category;
        }
      }

      const percentageUsed =
        income > 0 ? Math.round((expense / income) * 100) : 0;

      const predicted = expense;

      const advice = await getFinancialAdvice({
        income,
        expense,
        savings,
        percentageUsed,
        topCategory,
        predicted,
      });

      res.status(200).json({
        message: "AI Insights",
        payload: advice,
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);