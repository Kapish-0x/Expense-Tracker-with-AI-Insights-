import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Plus,
  UploadCloud,
  TrendingUp,
  Wallet,
  ReceiptIndianRupee,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";

import AddTransaction from "./AddTransaction";
import axios from "axios";

const StatCard = ({ label, value, icon: Icon, variant = "default" }) => (
  <div
    className={`h-44 border rounded-4xl p-8 flex flex-col justify-between transition-all duration-500 group ${
      variant === "income"
        ? "bg-emerald-50/30 border-emerald-100"
        : variant === "expense"
        ? "bg-rose-50/30 border-rose-100"
        : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    } hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}
  >
    <div className="flex justify-between items-start">
      <div
        className={`p-3 rounded-2xl transition-colors duration-300 ${
          variant === "income"
            ? "bg-emerald-100 text-emerald-600"
            : variant === "expense"
            ? "bg-rose-100 text-rose-600"
            : "bg-slate-50 text-slate-600 group-hover:bg-slate-950 group-hover:text-white"
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>

    <div>
      <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">
        {label}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-700">
        {value}
      </h2>
    </div>
  </div>
);

const Dashboard = () => {

  const { isAuthenticated, currentUser, checkAuth } = useAuth();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [receiptLoading, setReceiptLoading] = useState(false);

  // REFRESH DASHBOARD
  const handleRefresh = useCallback(async () => {

    try {

      if (checkAuth) {
        await checkAuth();
      }

      const res = await axios.get(
        "http://localhost:4000/expense-api/expenses",
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data.payload || []);

      setIsLoading(false);

    } catch (err) {

      console.error("Sync Error:", err);

      setIsLoading(false);
    }

  }, [checkAuth]);

  // OCR RECEIPT UPLOAD
 const handleReceiptUpload = async (e) => {

  try {

    const file = e.target.files[0];

    if (!file) return;

    setReceiptLoading(true);

    const formData = new FormData();
    formData.append("receipt", file);

    const scanRes = await axios.post(
      "http://localhost:4000/scan-receipt",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const extracted = scanRes.data.extracted;

    if (!extracted) throw new Error("No extracted data received");

    await axios.post(
      "http://localhost:4000/expense-api/expense",
      {
        amount: parseFloat(extracted.amount) || 0,
        category: "RECEIPT",
        type: "EXPENSE",
        date: extracted.date || new Date(),
        description: extracted.vendor || "Added from receipt scan",
      },
      {
        withCredentials: true,
      }
    );

    await handleRefresh();
    alert("Receipt scanned successfully");

  } catch (err) {

    console.error(err);
    alert("Receipt scan failed");

  } finally {
    setReceiptLoading(false);
  }
};

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      handleRefresh();
    }

  }, [isAuthenticated, navigate, handleRefresh]);

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savings = income - expense;
  const downloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Recent Transaction Logs", 14, 20);

  // const tableData = transactions.map((t, index) => [

  //   index + 1,
  //   t.description || "No Description",
  //   t.type,
  //   t.category,
  //   `₹ ${t.amount}`,
  //   new Date(t.date).toLocaleDateString("en-IN"),

  // ]);
const tableData = transactions.map((t, index) => [

  index + 1,
  t.description || "No Description",
  t.type,
  t.category,
  String(Number(t.amount).toFixed(2)),
  new Date(t.date).toLocaleDateString("en-IN"),

]);

  autoTable(doc, {

    startY: 30,

    head: [[
      "#",
      "Description",
      "Type",
      "Category",
      "Amount",
      "Date"
    ]],

    body: tableData,

  });

  doc.save("recent-transactions.pdf");
};

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-1000">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">
            Overview
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">

          <div className="relative">

            <input
              type="file"
              accept="image/*"
              id="receiptUpload"
              className="hidden"
              onChange={handleReceiptUpload}
            />

            <label
              htmlFor="receiptUpload"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <UploadCloud size={18} />
              {receiptLoading ? "Scanning..." : "Upload Receipt"}
            </label>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <StatCard
          label="Total Income"
          value={`₹${income.toLocaleString("en-IN")}`}
          icon={TrendingUp}
          variant="income"
        />

        <StatCard
          label="Total Expense"
          value={`₹${expense.toLocaleString("en-IN")}`}
          icon={ReceiptIndianRupee}
          variant="expense"
        />

        <StatCard
          label="Net Savings"
          value={`₹${savings.toLocaleString("en-IN")}`}
          icon={Wallet}
        />
      </div>

      {/* TRANSACTION HISTORY (ONLY SCROLL ADDED HERE) */}
      <div className="flex flex-col gap-6">

        <div className="flex justify-between items-center px-2">

  <div>
    <h3 className="text-xl font-semibold text-slate-900">
      Recent Logs
    </h3>
  </div>

  <button
    onClick={downloadPDF}
    className="bg-slate-950 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all"
  >
    Export PDF
  </button>

</div>
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500">

          {/* ONLY CHANGE: SCROLL WRAPPER */}
          <div className="max-h-[420px] overflow-y-auto">

            {isLoading ? (

              <div className="p-20 text-center flex flex-col items-center gap-2">

                <div className="w-2 h-2 bg-slate-950 rounded-full animate-ping"></div>

                <p className="text-slate-400 text-xs font-bold uppercase tracking-[3px]">
                  Syncing...
                </p>
              </div>

            ) : transactions.length === 0 ? (

              <div className="p-20 text-center flex flex-col items-center">

                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">

                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"></div>
                </div>

                <p className="text-slate-400 text-sm font-medium italic">
                  No recent transactions found.
                </p>
              </div>

            ) : (

              <div className="divide-y divide-slate-50">

                {transactions.slice(0, 100).map((t, idx) => (

                  <div
                    key={t._id || idx}
                    className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                          t.type === "INCOME"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {t.type === "INCOME"
                          ? <ArrowUpRight size={18} />
                          : <ArrowDownRight size={18} />}
                      </div>

                      <div>

                        <p className="text-slate-900 font-semibold text-sm">
                          {t.description || t.category}
                        </p>

                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          {new Date(t.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">

                      <p className={`font-bold text-sm ${
                        t.type === "INCOME"
                          ? "text-emerald-600"
                          : "text-slate-900"
                      }`}>
                        {t.type === "INCOME" ? "+" : "-"} ₹
                        {t.amount.toLocaleString("en-IN")}
                      </p>

                      <p className="text-[10px] text-slate-400 font-medium italic uppercase">
                        {t.category}
                      </p>
                    </div>
                  </div>

                ))}

              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODAL */}
      <AddTransaction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Dashboard;