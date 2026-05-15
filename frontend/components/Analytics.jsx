// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";

// import {
//   TrendingUp,
//   ReceiptIndianRupee,
//   BadgePercent,
//   PieChart as PieChartIcon,
//   Plus,
//   Pencil,
//   Trash2,
//   Target,
// } from "lucide-react";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// import { Doughnut, Line } from "react-chartjs-2";
// import AddGoal from "./AddGoal";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   Filler,
// );

// const StatCard = ({ label, value, icon: Icon, variant = "default" }) => (
//   <div
//     className={`h-44 border rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group ${
//       variant === "income"
//         ? "bg-emerald-50/30 border-emerald-100"
//         : variant === "expense"
//         ? "bg-rose-50/30 border-rose-100"
//         : variant === "category"
//         ? "bg-violet-50/30 border-violet-100"
//         : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
//     } hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}
//   >
//     <div className="flex justify-between items-start">
//       <div
//         className={`p-3 rounded-2xl ${
//           variant === "income"
//             ? "bg-emerald-100 text-emerald-600"
//             : variant === "expense"
//             ? "bg-rose-100 text-rose-600"
//             : variant === "category"
//             ? "bg-violet-100 text-violet-600"
//             : "bg-slate-100 text-slate-700"
//         }`}
//       >
//         <Icon size={20} strokeWidth={1.5} />
//       </div>
//     </div>

//     <div>
//       <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">
//         {label}
//       </p>
//       <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
//         {value}
//       </h2>
//     </div>
//   </div>
// );

// const Analytics = () => {
//   const { t, i18n } = useTranslation();

//   const [loading, setLoading] = useState(true);
//   const [transactions, setTransactions] = useState([]);
//   const [categoryAnalytics, setCategoryAnalytics] = useState([]);
//   const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const [goalModalOpen, setGoalModalOpen] = useState(false);
//   const [editingGoal, setEditingGoal] = useState(null);

//   const fetchAnalytics = async () => {
//     try {
//       const [txRes, categoryRes, monthlyRes, goalRes] = await Promise.all([
//         axios.get("http://localhost:4000/expense-api/expenses", { withCredentials: true }),
//         axios.get("http://localhost:4000/expense-api/category-analytics", { withCredentials: true }),
//         axios.get("http://localhost:4000/expense-api/income-expense-analytics", { withCredentials: true }),
//         axios.get("http://localhost:4000/expense-api/goal-analytics", { withCredentials: true }),
//       ]);

//       setTransactions(txRes.data.payload || []);
//       setCategoryAnalytics(categoryRes.data.payload || []);
//       setMonthlyAnalytics(monthlyRes.data.payload || []);
//       setGoals(goalRes.data.payload || []);
//     } catch (err) {
//       console.error("Analytics fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const deleteGoal = async (id) => {
//     if (!window.confirm(t("Are you sure?"))) return;
//     try {
//       await axios.delete(`http://localhost:4000/expense-api/goal/${id}`, { withCredentials: true });
//       fetchAnalytics();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const income = transactions
//     .filter((t) => t.type === "INCOME")
//     .reduce((sum, t) => sum + Number(t.amount), 0);

//   const expense = transactions
//     .filter((t) => t.type === "EXPENSE")
//     .reduce((sum, t) => sum + Number(t.amount), 0);

//   const savings = income - expense;
//   const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
//   const topCategory = categoryAnalytics.length > 0 ? categoryAnalytics[0]._id : t("not available");

//   const doughnutData = {
//     labels: categoryAnalytics.map((c) => t(c._id.toLowerCase())),
//     datasets: [
//       {
//         data: categoryAnalytics.map((c) => c.total),
//         backgroundColor: ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444", "#14b8a6", "#eab308", "#ec4899", "#64748b"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const months = [
//     t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun"),
//     t("jul"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec"),
//   ];

//   const incomeMap = {};
//   const expenseMap = {};

//   monthlyAnalytics.forEach((item) => {
//     const month = item._id.month;
//     const type = item._id.type;
//     if (type === "INCOME") incomeMap[month] = item.total;
//     if (type === "EXPENSE") expenseMap[month] = item.total;
//   });

//   const lineData = {
//     labels: months,
//     datasets: [
//       {
//         label: t("income"),
//         data: months.map((_, i) => incomeMap[i + 1] || 0),
//         borderColor: "#22c55e",
//         backgroundColor: "rgba(34,197,94,0.15)",
//         tension: 0.4,
//         fill: true,
//       },
//       {
//         label: t("expense"),
//         data: months.map((_, i) => expenseMap[i + 1] || 0),
//         borderColor: "#ef4444",
//         backgroundColor: "rgba(239,68,68,0.15)",
//         tension: 0.4,
//         fill: true,
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <div className="p-20 text-center">
//         <p className="text-slate-500 font-medium">{t("loading analytics")}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-12 animate-in fade-in duration-1000">
//         <div>
//           <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
//             {t("analytics")}
//           </h1>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
//           <StatCard
//             label={t("total income")}
//             value={`₹${income.toLocaleString("en-IN")}`}
//             icon={TrendingUp}
//             variant="income"
//           />
//           <StatCard
//             label={t("total expense")}
//             value={`₹${expense.toLocaleString("en-IN")}`}
//             icon={ReceiptIndianRupee}
//             variant="expense"
//           />
//           <StatCard
//             label={t("top category")}
//             value={topCategory}
//             icon={PieChartIcon}
//             variant="category"
//           />
//           <StatCard
//             label={t("savings rate")}
//             value={`${savingsRate}%`}
//             icon={BadgePercent}
//           />
//         </div>

//         {/* Charts Section - Now Un-commented and Fixed */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
//             <h2 className="text-xl font-semibold text-slate-900 mb-8">{t("category breakdown")}</h2>
//             <div className="h-[380px] flex items-center justify-center">
//               <Doughnut
//                 data={doughnutData}
//                 options={{
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { position: "bottom", labels: { padding: 20, usePointStyle: true } },
//                   },
//                   cutout: "68%",
//                 }}
//               />
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
//             <h2 className="text-xl font-semibold text-slate-900 mb-8">{t("income vs expense")}</h2>
//             <div className="h-[380px]">
//               <Line
//                 data={lineData}
//                 options={{
//                   maintainAspectRatio: false,
//                   responsive: true,
//                   plugins: { legend: { position: "bottom" } },
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Goals Section */}
//         <div className="flex flex-col gap-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-semibold text-slate-900">{t("savings goals")}</h2>
//             <button
//               onClick={() => { setEditingGoal(null); setGoalModalOpen(true); }}
//               className="flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95"
//             >
//               <Plus size={18} />
//               {t("add goal")}
//             </button>
//           </div>

//           {goals.length === 0 ? (
//             <div className="bg-white border border-slate-100 rounded-[2.5rem] p-16 text-center text-slate-400">
//               {t("no goals")}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//               {goals.map((goal) => (
//                 <div key={goal._id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
//                         <Target size={18} />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-slate-900">{goal.title}</h3>
//                         <p className="text-sm text-slate-400">₹{goal.targetAmount.toLocaleString("en-IN")}</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <button onClick={() => { setEditingGoal(goal); setGoalModalOpen(true); }}>
//                         <Pencil size={18} className="text-slate-400 hover:text-slate-900 transition-colors" />
//                       </button>
//                       <button onClick={() => deleteGoal(goal._id)}>
//                         <Trash2 size={18} className="text-rose-400 hover:text-rose-600 transition-colors" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mb-3 flex justify-between text-sm font-medium">
//                     <span className="text-slate-600">{t("progress")}</span>
//                     <span className="text-slate-900">{goal.progress}%</span>
//                   </div>

//                   <div className="h-4 rounded-full bg-slate-100 overflow-hidden mb-4">
//                     <div
//                       className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 transition-all duration-1000"
//                       style={{ width: `${goal.progress}%` }}
//                     />
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">
//                       {t("savings")}: ₹{savings.toLocaleString("en-IN")}
//                     </span>
//                     {goal.completed && (
//                       <span className="text-emerald-600 font-bold">{t("completed")}</span>
//                     )}
//                   </div>

//                   {goal.deadline && (
//                     <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                       {t("deadline")}: {new Date(goal.deadline).toLocaleDateString(i18n.language)}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <AddGoal
//         isOpen={goalModalOpen}
//         onClose={() => setGoalModalOpen(false)}
//         onRefresh={fetchAnalytics}
//         initialData={editingGoal}
//       />
//     </>
//   );
// };

// export default Analytics;









import { useEffect, useState } from "react";
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
  Filler,
);

const StatCard = ({ label, value, icon: Icon, variant = "default" }) => (
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
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [goals, setGoals] = useState([]);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const [txRes, categoryRes, monthlyRes, goalRes] = await Promise.all([
        axios.get("http://localhost:4000/expense-api/expenses", { withCredentials: true }),
        axios.get("http://localhost:4000/expense-api/category-analytics", { withCredentials: true }),
        axios.get("http://localhost:4000/expense-api/income-expense-analytics", { withCredentials: true }),
        axios.get("http://localhost:4000/expense-api/goal-analytics", { withCredentials: true }),
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
      await axios.delete(`http://localhost:4000/expense-api/goal/${id}`, { withCredentials: true });
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
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
  
  // UPDATED: Wrap topCategory in translation function
  const topCategoryRaw = categoryAnalytics.length > 0 ? categoryAnalytics[0]._id : null;
  const topCategory = topCategoryRaw ? t(topCategoryRaw.toLowerCase()) : t("not available");

  const doughnutData = {
    labels: categoryAnalytics.map((c) => t(c._id.toLowerCase())),
    datasets: [
      {
        data: categoryAnalytics.map((c) => c.total),
        backgroundColor: ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444", "#14b8a6", "#eab308", "#ec4899", "#64748b"],
        borderWidth: 0,
      },
    ],
  };

  // UPDATED: Explicitly map months to translation keys
  const months = [
    t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun"),
    t("jul"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec"),
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
        label: t("income"),
        data: Array.from({ length: 12 }, (_, i) => incomeMap[i + 1] || 0),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        fill: true,
      },
      {
        label: t("expense"),
        data: Array.from({ length: 12 }, (_, i) => expenseMap[i + 1] || 0),
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
        <p className="text-slate-500 font-medium">{t("loading analytics")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-12 animate-in fade-in duration-1000">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            {t("analytics")}
          </h1>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
        </div> */}
       {/* Stats Grid */}
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
          {/* Updated Top Category label and value for translation */}
          <StatCard
            label={t("top category")}
            value={topCategory}
            icon={PieChartIcon}
            variant="category"
          />
          {/* Updated Savings Rate label for translation */}
          <StatCard
            label={t("savings rate")}
            value={`${savingsRate}%`}
            icon={BadgePercent}
          />
        </div>


        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-8">{t("category breakdown")}</h2>
            <div className="h-[380px] flex items-center justify-center">
              <Doughnut
                data={doughnutData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom", labels: { padding: 20, usePointStyle: true } },
                  },
                  cutout: "68%",
                }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-8">{t("income vs expense")}</h2>
            <div className="h-[380px]">
              <Line
                data={lineData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: { 
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.dataset.label}: ₹${context.parsed.y.toLocaleString("en-IN")}`
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `₹${value.toLocaleString("en-IN")}`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-slate-900">{t("savings goals")}</h2>
            <button
              onClick={() => { setEditingGoal(null); setGoalModalOpen(true); }}
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
                <div key={goal._id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                        <Target size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{goal.title}</h3>
                        <p className="text-sm text-slate-400">₹{goal.targetAmount.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { setEditingGoal(goal); setGoalModalOpen(true); }}>
                        <Pencil size={18} className="text-slate-400 hover:text-slate-900 transition-colors" />
                      </button>
                      <button onClick={() => deleteGoal(goal._id)}>
                        <Trash2 size={18} className="text-rose-400 hover:text-rose-600 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 flex justify-between text-sm font-medium">
                    <span className="text-slate-600">{t("progress")}</span>
                    <span className="text-slate-900">{goal.progress}%</span>
                  </div>

                  <div className="h-4 rounded-full bg-slate-100 overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 transition-all duration-1000"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      {t("savings")}: ₹{savings.toLocaleString("en-IN")}
                    </span>
                    {goal.completed && (
                      <span className="text-emerald-600 font-bold">{t("completed")}</span>
                    )}
                  </div>

                  {goal.deadline && (
                    <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t("deadline")}: {new Date(goal.deadline).toLocaleDateString(i18n.language)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
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