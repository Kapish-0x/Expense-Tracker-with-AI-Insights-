import exp from "express";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { VerifyToken } from "../Middlewares/verifyToken.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler"; // YE ZAROORI HAI

export const userApp = exp.Router();

// 1. REGISTRATION
userApp.post(
  "/users",
  expressAsyncHandler(async (req, res) => {
    const newuser = req.body;
    if (!newuser.role) {
      newuser.role = "USER";
    } else {
      newuser.role = newuser.role.toUpperCase();
    }

    const allowedRoles = ["USER", "ADMIN"];
    if (!allowedRoles.includes(newuser.role)) {
      return res.status(400).json({ message: "invalid role" });
    }

    newuser.password = await bcrypt.hash(newuser.password, 12);
    const newUserDoc = new UserModel(newuser);
    await newUserDoc.save();

    res.status(201).json({ message: "user created" });
  }),
);

// 2. GET PROFILE
userApp.get(
  "/profile",
  VerifyToken("USER", "ADMIN"),
  expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User Profile", payload: user });
  }),
);

// 3. UPDATE BUDGET & ALERTS (Unified Route)
userApp.patch(
  "/budget",
  VerifyToken("USER"),
  expressAsyncHandler(async (req, res) => {
    const { monthlyBudget, minSavings, savingsAlertEnabled } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          monthlyBudget: Number(monthlyBudget),
          minSavings: Number(minSavings),
          savingsAlertEnabled: savingsAlertEnabled,
        },
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Financial protocols synchronized",
      payload: updatedUser,
    });
  }),
);

// 4. TERMINATE ACCOUNT
userApp.delete(
  "/terminate",
  VerifyToken("USER"),
  expressAsyncHandler(async (req, res) => {
    await UserModel.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Account terminated successfully" });
  }),
);






userApp.put(
  "/update-profile",
  VerifyToken("USER", "ADMIN"),
  async (req, res) => {
    try {

      const { name } = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name },
        { new: true }
      );

      res.json({
        success: true,
        payload: updatedUser,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);