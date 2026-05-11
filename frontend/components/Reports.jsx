import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  ShieldCheck,
  Download,
  CalendarRange,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [range, setRange] = useState("30days");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/expense-api/expenses",
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data.payload || []);
    } catch (err) {
      console.error("Reports fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER LOGIC
  const filteredTransactions = useMemo(() => {
    const now = new Date();

    return transactions.filter((t) => {
      const txDate = new Date(t.date);

      if (range === "7days") {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        return txDate >= last7;
      }

      if (range === "30days") {
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);
        return txDate >= last30;
      }

      if (range === "3months") {
        const last3Months = new Date();
        last3Months.setMonth(now.getMonth() - 3);
        return txDate >= last3Months;
      }

      if (range === "1year") {
        const lastYear = new Date();
        lastYear.setFullYear(now.getFullYear() - 1);
        return txDate >= lastYear;
      }

      return true;
    });
  }, [transactions, range]);

  // CALCULATIONS
  const income = filteredTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savings = income - expense;

  const savingsRate =
    income > 0 ? (savings / income) * 100 : 0;

  // FINANCIAL SCORE
  let financialScore = 50;

  if (savingsRate >= 40) {
    financialScore += 30;
  } else if (savingsRate >= 20) {
    financialScore += 15;
  }

  if (expense < income) {
    financialScore += 20;
  }

  financialScore = Math.max(
    0,
    Math.min(100, Math.round(financialScore))
  );

  const financialStatus =
    financialScore >= 80
      ? "Excellent"
      : financialScore >= 60
      ? "Stable"
      : financialScore >= 40
      ? "Moderate"
      : "Needs Attention";

  // TOP CATEGORY
  const categoryTotals = filteredTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => {
      acc[curr.category] =
        (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const highestCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  // PDF EXPORT
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.text("Financial Report", 14, 20);

      doc.setFontSize(12);

      doc.text(`Date Range: ${range}`, 14, 35);

      doc.text(
        `Financial Score: ${financialScore}/100`,
        14,
        45
      );

      doc.text(
        `Net Savings: ₹${savings.toLocaleString("en-IN")}`,
        14,
        55
      );

      const tableData = filteredTransactions.map((t, index) => [
        index + 1,
        t.description || "-",
        t.category,
        t.type,
        `₹${Number(t.amount).toLocaleString("en-IN")}`,
        new Date(t.date).toLocaleDateString("en-IN"),
      ]);

      autoTable(doc, {
        startY: 70,
        head: [
          [
            "#",
            "Description",
            "Category",
            "Type",
            "Amount",
            "Date",
          ],
        ],
        body: tableData,
        theme: "grid",
      });

      doc.save("financial-report.pdf");
    } catch (err) {
      console.error("PDF Export Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-20 text-center">
        <p className="text-slate-500 font-medium">
          Loading reports...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-1000">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Reports
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Financial records & exports
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* RANGE FILTER */}
          <div className="relative">
            <CalendarRange
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="pl-11 pr-5 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium outline-none"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="1year">Last 1 Year</option>
            </select>
          </div>

          {/* EXPORT BUTTON */}
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* FINANCIAL SCORE */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            {/* SCORE */}
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-slate-900">
                  {financialScore}
                </p>

                <p className="text-xs font-bold uppercase tracking-[3px] text-slate-400 mt-2">
                  Score
                </p>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">
                    {financialStatus}
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Overall financial health
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed max-w-xl">
                {financialScore >= 80
                  ? "Your financial discipline looks excellent during this reporting period."
                  : financialScore >= 60
                  ? "Your financial stability is healthy with manageable spending."
                  : financialScore >= 40
                  ? "Your spending patterns need better optimization."
                  : "Your expenses are heavily impacting your financial balance."}
              </p>
            </div>
          </div>

          {/* SIDE INFO */}
          <div className="grid grid-cols-1 gap-4 w-full xl:w-[320px]">
            <div className="border border-slate-100 rounded-3xl p-5">
              <p className="text-[11px] uppercase tracking-[2px] font-bold text-slate-400 mb-2">
                Net Savings
              </p>

              <h3 className="text-3xl font-semibold text-slate-900">
                ₹{savings.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="border border-slate-100 rounded-3xl p-5">
              <p className="text-[11px] uppercase tracking-[2px] font-bold text-slate-400 mb-2">
                Savings Rate
              </p>

              <h3 className="text-3xl font-semibold text-slate-900">
                {savingsRate.toFixed(1)}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* EXTRA REPORTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* STATEMENT */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Income vs Expense
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500 font-medium">
                Total Income
              </span>

              <span className="text-emerald-600 font-bold text-xl">
                ₹{income.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500 font-medium">
                Total Expense
              </span>

              <span className="text-rose-600 font-bold text-xl">
                ₹{expense.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-900 font-semibold text-lg">
                Net Balance
              </span>

              <span
                className={`font-bold text-2xl ${
                  savings >= 0
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                ₹{savings.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* SAVINGS TREND */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Savings Trend
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  Current Trend
                </p>

                <h3
                  className={`text-3xl font-bold ${
                    savingsRate >= 20
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {savingsRate >= 20
                    ? "Growing"
                    : "Declining"}
                </h3>
              </div>

              <div
                className={`p-4 rounded-2xl ${
                  savingsRate >= 20
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}
              >
                {savingsRate >= 20 ? (
                  <TrendingUp size={28} />
                ) : (
                  <TrendingDown size={28} />
                )}
              </div>
            </div>

            <div
              className={`px-5 py-3 rounded-2xl text-sm font-semibold w-fit ${
                savingsRate >= 20
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {savingsRate.toFixed(1)}% Savings Rate
            </div>
          </div>
        </div>

        {/* TOP CATEGORY */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-2xl bg-violet-100 text-violet-600">
              <Wallet size={22} />
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[2px] font-bold text-slate-400 mb-3">
            Highest Spending Category
          </p>

          <h2 className="text-3xl font-semibold text-slate-900">
            {highestCategory?.[0] || "N/A"}
          </h2>

          <p className="text-slate-400 mt-3 text-lg">
            ₹
            {highestCategory?.[1]?.toLocaleString(
              "en-IN"
            ) || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;