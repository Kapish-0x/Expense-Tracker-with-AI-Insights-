import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

import {
  ShieldCheck,
  Download,
  CalendarRange,
} from "lucide-react";

const Reports = () => {
  const { t, i18n } = useTranslation();

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
        { withCredentials: true }
      );
      setTransactions(res.data.payload || []);
    } catch (err) {
      console.error("Reports fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const rangeMap = {
    "7days": "last 7 days",
    "30days": "last 30 days",
    "3months": "last 3 months",
    "1year": "last 1 year",
  };

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
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

  const income = filteredTransactions
    .filter((tx) => tx.type === "INCOME")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const expense = filteredTransactions
    .filter((tx) => tx.type === "EXPENSE")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const savings = income - expense;
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;

  let financialScore = 50;
  if (savingsRate >= 40) financialScore += 30;
  else if (savingsRate >= 20) financialScore += 15;
  if (expense < income) financialScore += 20;
  financialScore = Math.max(0, Math.min(100, Math.round(financialScore)));

  const financialStatus =
    financialScore >= 80
      ? t("excellent")
      : financialScore >= 60
      ? t("stable")
      : financialScore >= 40
      ? t("moderate")
      : t("needs attention");

  const downloadPDF = async () => {
    try {
      const doc = new jsPDF("p", "mm", "a4");
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);
      doc.text(t("financial report"), 14, 20);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`${t("generated on")}: ${new Date().toLocaleDateString(i18n.language)}`, 14, 28);
      doc.text(`${t("report range")}: ${t(rangeMap[range])}`, 14, 34);

      const tableData = filteredTransactions.map((tx, i) => [
        i + 1,
        tx.description,
        tx.category,
        tx.type === "INCOME" ? t("income") : t("expense"),
        `Rs. ${Number(tx.amount).toLocaleString("en-IN")}`,
        new Date(tx.date).toLocaleDateString(i18n.language)
      ]);

      autoTable(doc, {
        startY: 45,
        head: [[ "#", t("description"), t("category"), t("type"), t("amount"), t("date") ]],
        body: tableData,
        headStyles: { fillColor: [15, 23, 42] },
      });

      doc.save(`${t("financial report")}.pdf`);
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="p-20 text-center font-semibold text-slate-500">{t("loading reports")}</div>;

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-1000 p-4 xl:p-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{t("reports")}</h1>
          <p className="text-slate-400 mt-2 text-sm">{t("financial statements")}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <CalendarRange size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="pl-11 pr-5 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium outline-none cursor-pointer"
            >
              <option value="7days">{t("last 7 days")}</option>
              <option value="30days">{t("last 30 days")}</option>
              <option value="3months">{t("last 3 months")}</option>
              <option value="1year">{t("last 1 year")}</option>
            </select>
          </div>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Download size={16} />
            {t("export pdf")}
          </button>
        </div>
      </div>

      {/* SCORE CARD SECTION */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
        <div className="flex flex-col xl:flex-row items-center gap-10">
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500 p-1">
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
              <p className="text-5xl font-bold text-slate-900">{financialScore}</p>
              <p className="text-xs font-bold uppercase tracking-[3px] text-slate-400 mt-2">{t("score")}</p>
            </div>
          </div>

          <div className="text-center xl:text-left">
            <div className="flex items-center justify-center xl:justify-start gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{financialStatus}</h2>
                <p className="text-slate-400 text-sm">{t("overall financial health")}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-xl">
              {financialScore >= 80 ? t("excellent finance desc") : 
               financialScore >= 60 ? t("stable finance desc") : 
               financialScore >= 40 ? t("moderate finance desc") : t("poor finance desc")}
            </p>
          </div>
        </div>
      </div>

      {/* MONTHLY STATEMENT TABLE */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">{t("monthly financial statement")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("month")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("income")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("expense")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("balance")}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, index) => {
                const mInc = transactions.filter(tx => new Date(tx.date).getMonth() === index && tx.type === "INCOME").reduce((s, tx) => s + Number(tx.amount), 0);
                const mExp = transactions.filter(tx => new Date(tx.date).getMonth() === index && tx.type === "EXPENSE").reduce((s, tx) => s + Number(tx.amount), 0);
                const balance = mInc - mExp;

                return (
                  <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-medium text-slate-700 capitalize">
                      {new Date(2024, index).toLocaleString(i18n.language, { month: "long" })}
                    </td>
                    <td className="py-4 text-emerald-600 font-semibold">₹{mInc.toLocaleString("en-IN")}</td>
                    <td className="py-4 text-rose-600 font-semibold">₹{mExp.toLocaleString("en-IN")}</td>
                    <td className={`py-4 font-bold ${balance >= 0 ? "text-slate-900" : "text-rose-600"}`}>
                      ₹{balance.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSACTION LEDGER TABLE */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">{t("transaction ledger")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("description")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("category")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("type")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("amount")}</th>
                <th className="text-left py-4 text-slate-400 text-xs uppercase tracking-[2px]">{t("date")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-slate-700 font-medium">{tx.description || "-"}</td>
                    <td className="py-4 text-slate-500 text-sm">{tx.category}</td>
                    <td className={`py-4 text-xs font-bold`}>
                      <span className={`px-3 py-1 rounded-full ${tx.type === "INCOME" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                        {tx.type === "INCOME" ? t("income") : t("expense")}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900">₹{Number(tx.amount).toLocaleString("en-IN")}</td>
                    <td className="py-4 text-slate-400 text-sm">{new Date(tx.date).toLocaleDateString(i18n.language)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400">{t("waiting data")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;