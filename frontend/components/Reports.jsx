import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

import {
  ShieldCheck,
  Download,
  CalendarRange,
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

  // DATE FILTER
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


const downloadPDF = async () => {
  try {
    const doc = new jsPDF("p", "mm", "a4");
    // TITLE
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text("Financial Report", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.text(
      `Generated on: ${new Date().toLocaleDateString("en-IN")}`,
      14,
      28
    );

    doc.text(`Report Range: ${range}`, 14, 34);

    // SUMMARY BOXES
    const summaryY = 48;

    const drawBox = (x, title, value) => {
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(x, summaryY, 55, 24, 4, 4, "F");

      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(title, x + 4, summaryY + 8);

      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text(value, x + 4, summaryY + 18);
    };

    drawBox(
      14,
      "Income",
      `Rs. ${income.toLocaleString("en-IN")}`
    );

    drawBox(
      77,
      "Expense",
      `Rs. ${expense.toLocaleString("en-IN")}`
    );

    drawBox(
      140,
      "Net Balance",
      `Rs. ${savings.toLocaleString("en-IN")}`
    );

    // FINANCIAL SCORE
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text("Financial Score", 14, 88);

    doc.setFontSize(34);
    doc.text(`${financialScore}/100`, 14, 104);

    doc.setFontSize(12);
    doc.setTextColor(90);
    doc.text(financialStatus, 14, 112);

    // CHARTS

    const chartElements = document.querySelectorAll("canvas");

    let currentY = 125;

    for (let i = 0; i < chartElements.length; i++) {
      const canvas = await html2canvas(chartElements[i], {
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      doc.addImage(
        imgData,
        "PNG",
        14,
        currentY,
        180,
        70
      );

      currentY += 80;
    }


    // TRANSACTION TABLE
    const tableData = filteredTransactions.map((t, index) => [
      index + 1,
      t.description || "-",
      t.category,
      t.type,
      `Rs. ${Number(t.amount).toLocaleString("en-IN")}`,
      new Date(t.date).toLocaleDateString("en-IN"),
    ]);

    autoTable(doc, {
      startY: currentY,
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

      styles: {
        fontSize: 10,
        cellPadding: 4,
      },

      headStyles: {
        fillColor: [15, 23, 42],
      },

      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },

      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 50 },
        2: { cellWidth: 35 },
        3: { cellWidth: 28 },
        4: { cellWidth: 35 },
        5: { cellWidth: 30 },
      },
    });

    // FOOTER
    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      doc.setFontSize(10);
      doc.setTextColor(140);

      doc.text(
        `Expense Tracker Report • Page ${i} of ${pageCount}`,
        14,
        290
      );
    }

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
            Financial statements & exports
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
        </div>
      </div>

      {/* MONTHLY FINANCIAL STATEMENT */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Monthly Financial Statement
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Month
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Income
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Expense
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Balance
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 12 }).map((_, index) => {
                const month = index + 1;

                const monthIncome = transactions
                  .filter(
                    (t) =>
                      new Date(t.date).getMonth() + 1 === month &&
                      t.type === "INCOME"
                  )
                  .reduce(
                    (sum, t) => sum + Number(t.amount),
                    0
                  );

                const monthExpense = transactions
                  .filter(
                    (t) =>
                      new Date(t.date).getMonth() + 1 === month &&
                      t.type === "EXPENSE"
                  )
                  .reduce(
                    (sum, t) => sum + Number(t.amount),
                    0
                  );

                const balance = monthIncome - monthExpense;

                return (
                  <tr
                    key={month}
                    className="border-b border-slate-50"
                  >
                    <td className="py-4 font-medium text-slate-700">
                      {new Date(0, index).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}
                    </td>

                    <td className="py-4 text-emerald-600 font-semibold">
                      ₹{monthIncome.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 text-rose-600 font-semibold">
                      ₹{monthExpense.toLocaleString("en-IN")}
                    </td>

                    <td
                      className={`py-4 font-bold ${
                        balance >= 0
                          ? "text-slate-900"
                          : "text-rose-600"
                      }`}
                    >
                      ₹{balance.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSACTION LEDGER */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Transaction Ledger
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Description
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Category
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Type
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Amount
                </th>

                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-slate-50"
                >
                  <td className="py-4 text-slate-700 font-medium">
                    {t.description}
                  </td>

                  <td className="py-4 text-slate-500">
                    {t.category}
                  </td>

                  <td
                    className={`py-4 font-semibold ${
                      t.type === "INCOME"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="py-4 font-bold text-slate-900">
                    ₹
                    {Number(t.amount).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="py-4 text-slate-500">
                    {new Date(t.date).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;