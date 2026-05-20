import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import {
  TrendingUp,
  ReceiptIndianRupee,
  BadgePercent,
  PieChart as PieChartIcon,
  Plus,
  Pencil,
  Trash2,
  Target,
  ChevronLeft,
  ChevronRight,
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

import AddGoal from "./AddGoal";

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

const StatCard = ({
  label,
  value,
  icon: Icon,
  variant = "default",
}) => (
  <div
    className={`h-44 border rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group ${
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
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [goals, setGoals] = useState([]);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );

  const selectedYear = new Date().getFullYear();

  const fetchAnalytics = async () => {
    try {
      const [txRes, categoryRes, monthlyRes, goalRes] =
        await Promise.all([
          axios.get(
            "http://localhost:4000/expense-api/expenses",
            { withCredentials: true }
          ),

          axios.get(
            "http://localhost:4000/expense-api/category-analytics",
            { withCredentials: true }
          ),

          axios.get(
            "http://localhost:4000/expense-api/income-expense-analytics",
            { withCredentials: true }
          ),

          axios.get(
            "http://localhost:4000/expense-api/goal-analytics",
            { withCredentials: true }
          ),
        ]);

      setTransactions(txRes.data.payload || []);
      setCategoryAnalytics(categoryRes.data.payload || []);
      setMonthlyAnalytics(monthlyRes.data.payload || []);
      setGoals(goalRes.data.payload || []);
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const deleteGoal = async (id) => {
    if (!window.confirm(t("Are you sure?"))) return;

    try {
      await axios.delete(
        `http://localhost:4000/expense-api/goal/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savings = income - expense;

  const savingsRate =
    income > 0
      ? ((savings / income) * 100).toFixed(1)
      : 0;

  const topCategoryRaw =
    categoryAnalytics.length > 0
      ? categoryAnalytics[0]._id
      : null;

  const topCategory = topCategoryRaw
    ? t(topCategoryRaw.toLowerCase())
    : t("not available");

  const doughnutData = {
    labels: categoryAnalytics.map((c) =>
      t(c._id.toLowerCase())
    ),

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

  const months = [
    t("jan"),
    t("feb"),
    t("mar"),
    t("apr"),
    t("may"),
    t("jun"),
    t("jul"),
    t("aug"),
    t("sep"),
    t("oct"),
    t("nov"),
    t("dec"),
  ];

  const incomeMap = {};
  const expenseMap = {};

  monthlyAnalytics.forEach((item) => {
    const month = item._id.month;
    const type = item._id.type;

    if (type === "INCOME") {
      incomeMap[month] = item.total;
    }

    if (type === "EXPENSE") {
      expenseMap[month] = item.total;
    }
  });

  const lineData = {
    labels: months,

    datasets: [
      {
        label: t("income"),

        data: Array.from(
          { length: 12 },
          (_, i) => incomeMap[i + 1] || 0
        ),

        borderColor: "#22c55e",

        backgroundColor: "rgba(34,197,94,0.15)",

        tension: 0.4,
        fill: true,
      },

      {
        label: t("expense"),

        data: Array.from(
          { length: 12 },
          (_, i) => expenseMap[i + 1] || 0
        ),

        borderColor: "#ef4444",

        backgroundColor: "rgba(239,68,68,0.15)",

        tension: 0.4,
        fill: true,
      },
    ],
  };

  // =========================
  // HEATMAP LOGIC
  // =========================

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    selectedYear,
    selectedMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    selectedYear,
    selectedMonth,
    1
  ).getDay();

  const expenseMapByDate = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);

    if (
      t.type === "EXPENSE" &&
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    ) {
      const day = date.getDate();

      if (!expenseMapByDate[day]) {
        expenseMapByDate[day] = 0;
      }

      expenseMapByDate[day] += Number(t.amount);
    }
  });

  const getHeatColor = (amount) => {
  if (!amount)
    return "bg-slate-100 border border-slate-200";

  if (amount < 500)
    return "bg-violet-100 border border-violet-200";

  if (amount < 2000)
    return "bg-violet-300 border border-violet-300";

  if (amount < 5000)
    return "bg-violet-500 border border-violet-500 text-white";

  return "bg-indigo-700 border border-indigo-700 text-white";
};

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  if (loading) {
    return (
      <div className="p-20 text-center">
        <p className="text-slate-500 font-medium">
          {t("loading analytics")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-12 animate-in fade-in duration-1000">

        {/* HEADER */}

        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            {t("analytics")}
          </h1>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          <StatCard
            label={t("total income")}
            value={`₹${income.toLocaleString("en-IN")}`}
            icon={TrendingUp}
            variant="income"
          />

          <StatCard
            label={t("total expense")}
            value={`₹${expense.toLocaleString("en-IN")}`}
            icon={ReceiptIndianRupee}
            variant="expense"
          />

          <StatCard
            label={t("top category")}
            value={topCategory}
            icon={PieChartIcon}
            variant="category"
          />

          <StatCard
            label={t("savings rate")}
            value={`${savingsRate}%`}
            icon={BadgePercent}
          />

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-900 mb-8">
              {t("category breakdown")}
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
              {t("income vs expense")}
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

        {/* GOALS */}

        <div className="flex flex-col gap-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-semibold text-slate-900">
              {t("savings goals")}
            </h2>

            <button
              onClick={() => {
                setEditingGoal(null);
                setGoalModalOpen(true);
              }}
              className="flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95"
            >
              <Plus size={18} />
              {t("add goal")}
            </button>

          </div>

          {goals.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-16 text-center text-slate-400">
              {t("no goals")}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow"
                >

                  <div className="flex justify-between items-start mb-6">

                    <div className="flex items-center gap-3">

                      <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                        <Target size={18} />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {goal.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                          ₹{goal.targetAmount.toLocaleString("en-IN")}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => {
                          setEditingGoal(goal);
                          setGoalModalOpen(true);
                        }}
                      >
                        <Pencil
                          size={18}
                          className="text-slate-400 hover:text-slate-900"
                        />
                      </button>

                      <button
                        onClick={() => deleteGoal(goal._id)}
                      >
                        <Trash2
                          size={18}
                          className="text-rose-400 hover:text-rose-600"
                        />
                      </button>

                    </div>
                  </div>

                  <div className="mb-3 flex justify-between text-sm font-medium">

                    <span className="text-slate-600">
                      {t("progress")}
                    </span>

                    <span className="text-slate-900">
                      {goal.progress}%
                    </span>

                  </div>

                  <div className="h-4 rounded-full bg-slate-100 overflow-hidden mb-4">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>


{/* HEATMAP */}


<div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm max-w-[900px] mx-auto w-full">
  

  {/* HEADER */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Spending Heatmap
      </h2>

      <p className="text-xs text-slate-400 mt-1">
        Track daily expenses month-wise
      </p>
    </div>

    <div className="flex items-center gap-3">

      <button
        onClick={() =>
          setSelectedMonth((prev) =>
            prev === 0 ? 11 : prev - 1
          )
        }
        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="min-w-[160px] text-center bg-slate-100 rounded-xl px-4 py-2 font-semibold text-sm text-slate-800">
        {monthNames[selectedMonth]} {selectedYear}
      </div>

      <button
        onClick={() =>
          setSelectedMonth((prev) =>
            prev === 11 ? 0 : prev + 1
          )
        }
        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
      >
        <ChevronRight size={16} />
      </button>

    </div>

  </div>

  {/* LEGEND */}

<div className="flex justify-center flex-wrap gap-5 mb-8 text-[11px] text-slate-500">

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-slate-100 border"></div>
    <span>No Expense</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-violet-100"></div>
    <span>Low</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-violet-300"></div>
    <span>Medium</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-violet-500"></div>
    <span>High</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-indigo-700"></div>
    <span>Very High</span>
  </div>

</div>

  {/* CENTER CALENDAR */}

  <div className="flex justify-center">

    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 inline-block">

      {/* WEEKDAYS */}

      <div className="grid grid-cols-7 gap-3 mb-3">

        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400"
            >
              {day}
            </div>
          )
        )}

      </div>

      {/* CALENDAR GRID */}

      <div className="grid grid-cols-7 gap-3">

        {calendarDays.map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="h-14 w-14"
              />
            );
          }

          const amount =
            expenseMapByDate[day] || 0;

          return (
            <div
              key={day}
              title={
                amount > 0
                  ? `₹${amount.toLocaleString(
                      "en-IN"
                    )} spent`
                  : "No Expense"
              }
              className={`h-14 w-14 rounded-xl p-1.5 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer flex flex-col justify-between ${getHeatColor(
                amount
              )}`}
            >

              <span className="text-[10px] font-semibold">
                {day}
              </span>

              {amount > 0 && (
                <span className="text-[8px] font-bold truncate">
                  ₹
                  {amount > 999
                    ? `${(amount / 1000).toFixed(1)}k`
                    : amount}
                </span>
              )}

            </div>
          );
        })}

      </div>

    </div>

  </div>

</div>

      </div>

      <AddGoal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onRefresh={fetchAnalytics}
        initialData={editingGoal}
      />
    </>
  );
};

export default Analytics;