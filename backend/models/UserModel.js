import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already registered"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },

    monthlyBudget: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      uppercase: true,
      trim: true,
    },
    profileImageUrl: {
      type: String,
    },
    isUserActive: {
      type: Boolean,
      default: true,
    },
    minSavings: {
      type: Number,
      default: 0,
    },
    savingsAlertEnabled: {
      type: Boolean,
      default: true,
    },
    budgetAlertEnabled: {
      type: Boolean,
      default: true,
    },
    alertHistory: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);

export const UserModel = model("users", userSchema);
