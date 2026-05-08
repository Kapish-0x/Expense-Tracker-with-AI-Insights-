import { useEffect, useState } from "react";
import axios from "axios";
import {
  TrendingUp,
  ReceiptIndianRupee,
  BadgePercent,
  PieChart as PieChartIcon,
} from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const StatCard = ({ label, value, icon: Icon, variant = "default" }) => (
  <div
    className={`h-44 border rounded-4xl p-8 flex flex-col justify-between transition-all duration-500 group ${
      variant === "income"
        ? "bg-emerald-50/30 border-emerald-100"
        : variant === "expense"
        ? "bg-rose-50/30 border-rose-100"
        : variant === "category"
        ? "bg-violet-50/30 border-violet-100"
        : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    } hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}
  >
    <div className="flex justify-between items-start">
      <div
        className={`p-3 rounded-2xl ${
          variant === "income"
            ? "bg-emerald-100 text-emerald-600"
            : variant === "expense"
            ? "bg-rose-100 text-rose-600"
            : variant === "category"
            ? "bg-violet-100 text-violet-600"
            : "bg-slate-100 text-slate-700"
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>

    <div>
      <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">
        {label}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </h2>
    </div>
  </div>
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [txRes, categoryRes, monthlyRes] = await Promise.all([
          axios.get("http://localhost:4000/expense-api/expenses", {
            withCredentials: true,
          }),
          axios.get("http://localhost:4000/expense-api/category-analytics", {
            withCredentials: true,
          }),
          axios.get(
            "http://localhost:4000/expense-api/income-expense-analytics",
            {
              withCredentials: true,
            }
          ),
        ]);

        setTransactions(txRes.data.payload || []);
        setCategoryAnalytics(categoryRes.data.payload || []);
        setMonthlyAnalytics(monthlyRes.data.payload || []);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // KPI calculations
  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savings = income - expense;

  const savingsRate =
    income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  const topCategory =
    categoryAnalytics.length > 0 ? categoryAnalytics[0]._id : "N/A";

  // Doughnut data
  const doughnutData = {
    labels: categoryAnalytics.map((c) => c._id),
    datasets: [
      {
        data: categoryAnalytics.map((c) => c.total),
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f97316",
          "#a855f7",
          "#ef4444",
          "#14b8a6",
          "#eab308",
          "#ec4899",
          "#64748b",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Monthly line data
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const incomeMap = {};
  const expenseMap = {};

  monthlyAnalytics.forEach((item) => {
    const month = item._id.month;
    const type = item._id.type;

    if (type === "INCOME") incomeMap[month] = item.total;
    if (type === "EXPENSE") expenseMap[month] = item.total;
  });

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: months.map((_, i) => incomeMap[i + 1] || 0),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expense",
        data: months.map((_, i) => expenseMap[i + 1] || 0),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="p-20 text-center">
        <p className="text-slate-500 font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-1000">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Analytics
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
          label="Top Category"
          value={topCategory}
          icon={PieChartIcon}
          variant="category"
        />

        <StatCard
          label="Savings Rate"
          value={`${savingsRate}%`}
          icon={BadgePercent}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-8">
            Category Breakdown
          </h2>

          <div className="h-[380px] flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      padding: 20,
                      usePointStyle: true,
                    },
                  },
                },
                cutout: "68%",
              }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-8">
            Income vs Expense
          </h2>

          <div className="h-[380px]">
            <Line
              data={lineData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;