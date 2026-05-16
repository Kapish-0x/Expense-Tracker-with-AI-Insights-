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
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // allow both ports
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const upload = multer({ dest: "uploads/" });

// ===============================
// CLEAN AMOUNT EXTRACTION (ROBUST)
// ===============================
function extractAmount(rawText) {
  const lines = rawText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let candidates = [];

  const moneyRegex = /(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?|\d+\.\d{1,2})/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();

    // prioritize TOTAL lines
    if (line.includes("total") && !line.includes("subtotal")) {
      for (let j = i; j <= i + 2 && j < lines.length; j++) {
        const matches = lines[j].match(moneyRegex);

        if (matches) {
          matches.forEach(num => {
            const cleaned = parseFloat(num.replace(/,/g, ""));
            if (!isNaN(cleaned)) candidates.push(cleaned);
          });
        }
      }
    }
  }

  // fallback: scan whole text
  if (candidates.length === 0) {
    const all = rawText.match(moneyRegex);

    if (all) {
      all.forEach(num => {
        const cleaned = parseFloat(num.replace(/,/g, ""));
        if (!isNaN(cleaned)) candidates.push(cleaned);
      });
    }
  }

  if (candidates.length === 0) return "0.00";

  // take highest (usually TOTAL)
  return Math.max(...candidates).toFixed(2);
}


// ===============================
// CLEAN DATE EXTRACTION
// ===============================
function extractDate(text) {
  const regex =
    /(\d{2}[\/\-]\d{2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{2}[\/\-]\d{2})/;

  const match = text.match(regex);

  if (!match) return new Date().toISOString();

  const parsed = new Date(match[0]);

  if (isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


// ===============================
// VENDOR EXTRACTION (IMPROVED)
// ===============================
function extractVendor(text) {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const ignoreKeywords = [
    "TOTAL",
    "SUBTOTAL",
    "TAX",
    "DATE",
    "AMOUNT",
    "QTY",
    "PRICE",
    "INVOICE",
    "RECEIPT",
    "PHONE",
    "GST"
  ];

  for (let line of lines) {
    const upper = line.toUpperCase();

    if (
      line.length > 3 &&
      !ignoreKeywords.some(word => upper.includes(word)) &&
      /[a-zA-Z]/.test(line)
    ) {
      return line;
    }
  }

  return "Unknown Vendor";
}


// ===============================
// ROUTE
// ===============================
app.post("/scan-receipt", upload.single("receipt"), async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Upload file using field 'receipt'"
      });
    }

    filePath = req.file.path;

    const result = await Tesseract.recognize(
      filePath,
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

    return res.json({
      success: true,
      extracted: {
        vendor,
        amount,
        date
      }
    });

  } catch (err) {
    console.error("OCR ERROR:", err);

    return res.status(500).json({
      message: err.message || "OCR processing failed"
    });

  } finally {
    // always cleanup file
    if (filePath) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("File cleanup failed:", e.message);
      }
    }
  }
});
app.use("/common-api", commonApp);
app.use("/user-api", userApp);
app.use("/expense-api", expenseApp);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on: ${PORT}`);
    });

  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

startServer();

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});




