import express from "express";
import { connect } from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import cors from "cors";
import multer from "multer";
import Tesseract from "tesseract.js";
import cookieParser from "cookie-parser";

import { commonApp } from "./APIs/CommonAPI.js";
import { userApp } from "./APIs/UserAPI.js";
import { expenseApp } from "./APIs/ExpenseAPI.js";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const upload = multer({ dest: "uploads/" });

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractAmount(text) {
  const match = text.match(/(\d+(\.\d{1,2})?)/);
  return match ? match[0] : null;
}

function extractDate(text) {
  const match = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/);
  return match ? match[0] : null;
}

function extractVendor(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  return lines[0] || "Unknown";
}

// OCR API 
app.post("/scan-receipt", upload.single("receipt"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Use field name 'receipt'"
      });
    }

    const result = await Tesseract.recognize(req.file.path, "eng");

    const rawText = result.data.text;

    console.log("========== RAW OCR TEXT ==========");
    console.log(rawText);

    const text = cleanText(rawText);

    console.log("========== CLEANED TEXT ==========");
    console.log(text);

    const amount = extractAmount(text);
    const date = extractDate(text);
    const vendor = extractVendor(rawText);

    console.log("========== EXTRACTED DATA ==========");
    console.log({ vendor, amount, date });

    res.json({
      success: true,
      extracted: {
        vendor,
        amount,
        date
      }
    });

  } catch (err) {
    console.error("OCR ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.use("/common-api", commonApp);
app.use("/user-api", userApp);
app.use("/expense-api", expenseApp);

// ================= DATABASE + SERVER =================
const port = process.env.PORT || 4000;

async function connectDB() {
  try {
    await connect(process.env.DB_URL);

    console.log("DB connection successful");

    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );

  } catch (err) {
    console.log("DB connection error:", err);
  }
}

connectDB();

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.log(err.name);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation Error", error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Cast Error", error: err.message });
  }

  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});