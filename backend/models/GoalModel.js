import { Schema, model } from "mongoose";

const GoalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    targetAmount: {
      type: Number,
      required: true,
    },

    deadline: {
      type: Date,
    },

    description: {
      type: String,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const GoalModel = model("goals", GoalSchema);
