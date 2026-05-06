import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import Tesseract from "tesseract.js";
import cookieParser from "cookie-parser";
import fs from "fs";
import { commonApp } from "./APIs/CommonAPI.js";
import { userApp } from "./APIs/UserAPI.js";
import { expenseApp } from "./APIs/ExpenseAPI.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const upload = multer({ dest: "uploads/" });


// FINAL STRONG AMOUNT EXTRACTION 
function extractAmount(rawText) {
  const lines = rawText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let candidates = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (line.includes("total") && !line.includes("subtotal")) {
      for (let j = i; j <= i + 2 && j < lines.length; j++) {
        const text = lines[j];
        const matches = text.match(/\d+[.,]\d{2}/g);
        if (matches) {
          matches.forEach(num => {
            candidates.push(parseFloat(num.replace(/,/g, "")));
          });
        }
        const split = text.match(/(\d+)\s+(\d{2})/);
        if (split) {
          candidates.push(parseFloat(split[1] + "." + split[2]));
        }
        const merged = text.match(/\d{4,}/);
        if (merged) {
          candidates.push(parseFloat(merged[0]) / 100);
        }
      }
    }
  }

  if (candidates.length > 0) {
    return Math.max(...candidates).toFixed(2);
  }
  const all = rawText.match(/\d+[.,]\d{2}/g);
  if (all) {
    const values = all.map(v => parseFloat(v.replace(/,/g, "")));
    return Math.max(...values).toFixed(2);
  }

  return "0.00";
}

function extractDate(text) {
  const regex =
    /(\d{2}[\/\-]\d{2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{2}[\/\-]\d{2})/;

  const match = text.match(regex);
  return match ? match[0] : new Date().toLocaleDateString();
}
function extractVendor(text) {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const ignore = [
    "NAME", "ADDRESS", "DATE", "QTY",
    "DESCRIPTION", "PRICE", "TOTAL",
    "SUBTOTAL", "TAX", "PHONE"
  ];

  for (let line of lines) {
    if (
      line.length > 2 &&
      !ignore.some(w => line.toUpperCase().includes(w))
    ) {
      return line;
    }
  }

  return "Unknown Vendor";
}

app.post("/scan-receipt", upload.single("receipt"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Upload file using field 'receipt'"
      });
    }

    const result = await Tesseract.recognize(
      req.file.path,
      "eng",
      {
        logger: m => console.log(m)
      }
    );

    const rawText = result.data.text;

    console.log("------ OCR TEXT ------\n", rawText);

    const amount = extractAmount(rawText);
    const date = extractDate(rawText);
    const vendor = extractVendor(rawText);

    // delete uploaded file
    fs.unlinkSync(req.file.path);

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
    res.status(500).json({
      error: err.message
    });
  }
});

app.use("/common-api", commonApp);
app.use("/user-api", userApp);
app.use("/expense-api", expenseApp);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running: http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

startServer();

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});




