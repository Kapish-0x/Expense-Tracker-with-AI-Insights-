import exp from "express";
import { ExpenseModel } from "../models/ExpenseModel.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";
export const expenseApp = exp.Router();
import mongoose from "mongoose";
import { getFinancialAdvice } from "../Services/AIService.js";
import { GoalModel } from "../models/GoalModel.js";
import expressAsyncHandler from "express-async-handler";

// ADD EXPENSE & UPDATE USER TOTALS
expenseApp.post("/expense", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;
    const { amount, type } = req.body;

    // 1. Save the new expense/income transaction
    const newExpense = new ExpenseModel({ ...req.body, userId: userIdOfToken });
    const savedExpense = await newExpense.save();

    // 2. Update User's Total Income/Expense in Database
    // $inc atomicity provide karta hai (race conditions se bachata hai)
    const updateField =
      type === "INCOME" ? { income: amount } : { expense: amount };

    // Hamein user ka updated document chahiye alerts check karne ke liye
    const user = await UserModel.findByIdAndUpdate(
      userIdOfToken,
      { $inc: updateField },
      { new: true }, // Updated user wapas dega
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Logic: Check for Budget Alerts (Only for Expenses)
    let alertMessage = null;
    if (type === "EXPENSE") {
      // Current month ka start date nikalne ke liye
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      );

      // Current month ke saare expenses fetch karo total spent calculate karne ke liye
      const monthlyExpenses = await ExpenseModel.find({
        userId: userIdOfToken,
        type: "EXPENSE",
        date: { $gte: startOfMonth },
      });

      const totalSpent = monthlyExpenses.reduce(
        (sum, exp) => sum + exp.amount,
        0,
      );

      if (user.monthlyBudget > 0) {
        const usagePercentage = (totalSpent / user.monthlyBudget) * 100;

        if (usagePercentage >= 90) {
          alertMessage =
            "🚨 CRITICAL: You have used over 90% of your monthly budget!";
        } else if (usagePercentage >= 50) {
          alertMessage = "⚠️ ALERT: You've crossed 50% of your monthly budget.";
        }
      }

      // 4. Save alert to User's History if triggered
      if (alertMessage) {
        user.alertHistory.push({ message: alertMessage });
        await user.save(); // Alert save kar rahe hain
      }
    }

    // 5. Send final response
    res.status(201).json({
      message:
        type === "INCOME"
          ? "Income added successfully"
          : "Expense added successfully",
      alert: alertMessage,
      payload: savedExpense,
      user: user,
      updatedUser: {
        // Optional: for debugging
        income: user.income,
        expense: user.expense,
      },
    });
  } catch (err) {
    console.error("Route Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET ALL EXPENSES
expenseApp.get("/expenses", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;

    const expensesList = await ExpenseModel.find({
      userId: userIdOfToken,
    }).sort({ date: -1 });
    res.status(200).json({ message: "Expenses", payload: expensesList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE EXPENSE
expenseApp.get(
  "/expense/:id",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      const expense = await ExpenseModel.findOne({
        _id: expenseId,
        userId: userIdOfToken,
      });

      res.status(200).json({ message: "Expense", payload: expense });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// UPDATE EXPENSE
expenseApp.put(
  "/expense/:id",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      const updatedExpense = await ExpenseModel.findOneAndUpdate(
        { _id: expenseId, userId: userIdOfToken },
        req.body,
        { new: true },
      );
      res
        .status(200)
        .json({ message: "Expense updated", payload: updatedExpense });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// DELETE EXPENSE
expenseApp.delete(
  "/expense/:id",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const expenseId = req.params.id;

      await ExpenseModel.findOneAndDelete({
        _id: expenseId,
        userId: userIdOfToken,
      });

      res.status(200).json({ message: "Expense deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

//Dashboard kind of thing

expenseApp.get("/summary", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;

    const expenses = await ExpenseModel.find({ userId: userIdOfToken });
    let income = 0;
    let expense = 0;

    expenses.forEach((item) => {
      if (item.type === "INCOME") income += item.amount;
      else expense += item.amount;
    });
    const savings = income - expense;

    res
      .status(200)
      .json({ message: "summary", payload: { income, expense, savings } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//charts purpose
//expenses category

expenseApp.get(
  "/category-analytics",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      // aggregate category totals
      const analytics = await ExpenseModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userIdOfToken),
            type: "EXPENSE",
          },
        },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]);

      res
        .status(200)
        .json({ message: "Category analytics", payload: analytics });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

//monthly income vs expenses comparision chart

expenseApp.get(
  "/income-expense-analytics",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
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

      res
        .status(200)
        .json({ message: "Income vs Expense analytics", payload: analytics });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

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
            type: "EXPENSE",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

      // calculate average
      let predicted = 0;

      // take only last 3 months
      const recentMonths = monthlyExpenses.slice(-3);

      if (recentMonths.length > 0) {
        const sum = recentMonths.reduce((acc, item) => acc + item.total, 0);

        predicted = Math.round(sum / recentMonths.length);
      }

      res.status(200).json({
        message: "Predicted next month expense",
        payload: {
          consideredMonths: recentMonths,
          predicted,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
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
  },
);

//GOAL TRACKING

//Add goal

expenseApp.post("/goal", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;

    const goal = await GoalModel.create({
      ...req.body,
      userId: userIdOfToken,
    });

    res.status(201).json({
      message: "Goal created",
      payload: goal,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//get goal

expenseApp.get("/goals", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;

    const goals = await GoalModel.find({
      userId: userIdOfToken,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Goals",
      payload: goals,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//delete goal

expenseApp.delete(
  "/goal/:id",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;
      const goalId = req.params.id;

      await GoalModel.findOneAndDelete({
        _id: goalId,
        userId: userIdOfToken,
      });

      res.status(200).json({
        message: "Goal deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

//edit goal

expenseApp.put("/goal/:id", VerifyToken("USER", "ADMIN"), async (req, res) => {
  try {
    const userIdOfToken = req.user?.id;
    const goalId = req.params.id;

    const updatedGoal = await GoalModel.findOneAndUpdate(
      {
        _id: goalId,
        userId: userIdOfToken,
      },
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Goal updated",
      payload: updatedGoal,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//goal-analytics

expenseApp.get(
  "/goal-analytics",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {
      const userIdOfToken = req.user?.id;

      const user = await UserModel.findById(userIdOfToken);

      const savings = user.income - user.expense;

      const goals = await GoalModel.find({
        userId: userIdOfToken,
      });

      const analytics = goals.map((goal) => {
        const progress = Math.min((savings / goal.targetAmount) * 100, 100);

        return {
          ...goal._doc,
          currentSavings: savings,
          progress: Number(progress.toFixed(1)),
          completed: savings >= goal.targetAmount,
        };
      });

      res.status(200).json({
        message: "Goal analytics",
        payload: analytics,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);



expenseApp.delete(
  "/delete-all",
  VerifyToken("USER", "ADMIN"),
  expressAsyncHandler(async (req, res) => {

    await ExpenseModel.deleteMany({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "All transactions removed successfully",
    });
  })
);