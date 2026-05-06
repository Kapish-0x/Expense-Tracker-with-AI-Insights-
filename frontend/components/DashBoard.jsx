// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { Plus, UploadCloud, TrendingUp, Wallet, ReceiptIndianRupee } from "lucide-react";
// import AddTransaction from "./AddTransaction";


// const StatCard = ({ label, value, icon: Icon, trend }) => (
//   <div className="h-44 bg-white border border-slate-100 rounded-4xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group">
//     <div className="flex justify-between items-start">
//       <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300">
//         <Icon size={20} strokeWidth={1.5} />
//       </div>
//       {trend && (
//         <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
//           {trend}
//         </span>
//       )}
//     </div>
//     <div>
//       <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">{label}</p>
//       <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
//         {value}
//       </h2>
//     </div>
//   </div>
// );

// const Dashboard = () => {
//   // Destructured 'checkAuth' (ya fetchUser function) from store
//   const { isAuthenticated, currentUser, checkAuth } = useAuth(); 
//   const navigate = useNavigate();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   const userName = currentUser?.username || currentUser?.name || "Ghost User";
//   const income = currentUser?.income || 0;
//   const expense = currentUser?.expense || 0;
//   const savings = income - expense;

//   // Real Refresh Logic: Ye function store se fresh user data layega
//   const handleRefresh = async () => {
//     if (checkAuth) {
//       await checkAuth(); // Re-fetches user from backend via cookies
//       console.log("Dashboard state synced with latest transactions.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      
//       {/* 1. Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div>
//           <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">
//             Overview
//           </h1>
//           <p className="text-slate-400 text-sm font-medium italic">
//             Active Node: <span className="text-slate-900 font-bold">{userName.toUpperCase()}</span>
//           </p>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
//             <UploadCloud size={18} strokeWidth={2} />
//             Upload Receipt
//           </button>
          
//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
//           >
//             <Plus size={18} strokeWidth={2} />
//             Add Transaction
//           </button>
//         </div>
//       </div>

//       {/* 2. Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <StatCard 
//           label="Total Income" 
//           value={`₹${income.toLocaleString()}`} 
//           icon={TrendingUp}   
//         />
//         <StatCard 
//           label="Total Expense" 
//           value={`₹${expense.toLocaleString()}`} 
//           icon={ReceiptIndianRupee} 
//         />
//         <StatCard 
//           label="Net Savings" 
//           value={`₹${savings.toLocaleString()}`} 
//           icon={Wallet} 
//         />
//       </div>

//       {/* 3. Status Section */}
//       <div className="w-full h-80 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center group">
//         <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
//           <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
//         </div>
//         <p className="text-slate-400 text-[11px] tracking-[4px] uppercase font-bold">
//           Data Stream: {currentUser?.email || "No Connection"}
//         </p>
//         <p className="text-slate-300 text-xs mt-2 font-medium">
//           Initial synchronization complete. All values are currently at baseline.
//         </p>
//       </div>

//       {/* Transaction Modal Integration */}
//       <AddTransaction
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onRefresh={handleRefresh}
//       />
//     </div>
//   );
// };

// export default Dashboard;












// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { Plus, UploadCloud, TrendingUp, Wallet, ReceiptIndianRupee, ArrowDownRight, ArrowUpRight } from "lucide-react";
// import AddTransaction from "./AddTransaction";
// import axios from "axios";

// const StatCard = ({ label, value, icon: Icon, trend, variant = "default" }) => (
//   <div className={`h-44 border rounded-4xl p-8 flex flex-col justify-between transition-all duration-300 group ${
//     variant === "income" ? "bg-emerald-50/30 border-emerald-100" : 
//     variant === "expense" ? "bg-rose-50/30 border-rose-100" : 
//     "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
//   } hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}>
//     <div className="flex justify-between items-start">
//       <div className={`p-3 rounded-2xl transition-colors duration-300 ${
//         variant === "income" ? "bg-emerald-100 text-emerald-600" :
//         variant === "expense" ? "bg-rose-100 text-rose-600" :
//         "bg-slate-50 text-slate-600 group-hover:bg-slate-950 group-hover:text-white"
//       }`}>
//         <Icon size={20} strokeWidth={1.5} />
//       </div>
//     </div>
//     <div>
//       <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">{label}</p>
//       <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{value}</h2>
//     </div>
//   </div>
// );

// const Dashboard = () => {
//   const { isAuthenticated, currentUser, checkAuth } = useAuth(); 
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [transactions, setTransactions] = useState([]); // Transactions state

//   // 1. Fetch Transactions and User Data
//   const handleRefresh = async () => {
//     try {
//       // Refresh User Stats (Income/Expense totals)
//       if (checkAuth) await checkAuth();
      
//       // Fetch Latest Transactions List
//       const res = await axios.get("http://localhost:4000/expense-api/expenses", { withCredentials: true });
//       setTransactions(res.data.payload || []);
//     } catch (err) {
//       console.error("Sync Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       handleRefresh(); // Initial Load
//     }
//   }, [isAuthenticated]);

//   const userName = currentUser?.username || currentUser?.name || "Ghost User";
//   const income = currentUser?.income || 0;
//   const expense = currentUser?.expense || 0;
//   const savings = income - expense;

//   return (
//     <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div>
//           <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">Overview</h1>
//           <p className="text-slate-400 text-sm font-medium italic">
//             Active Node: <span className="text-slate-900 font-bold">{userName.toUpperCase()}</span>
//           </p>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
//             <UploadCloud size={18} /> Upload Receipt
//           </button>
          
//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg"
//           >
//             <Plus size={18} /> Add Transaction
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <StatCard label="Total Income" value={`₹${income.toLocaleString()}`} icon={TrendingUp} variant="income" />
//         <StatCard label="Total Expense" value={`₹${expense.toLocaleString()}`} icon={ReceiptIndianRupee} variant="expense" />
//         <StatCard label="Net Savings" value={`₹${savings.toLocaleString()}`} icon={Wallet} />
//       </div>

//       {/* Data Stream / Transactions List */}
//       <div className="flex flex-col gap-6">
//         <div className="flex justify-between items-end px-2">
//           <div>
//             <h3 className="text-xl font-semibold text-slate-900">Data Stream</h3>
//             <p className="text-slate-400 text-[10px] tracking-[2px] font-bold uppercase">{currentUser?.email}</p>
//           </div>
//           <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">Recent Activity</span>
//         </div>

//         <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
//           {transactions.length === 0 ? (
//             <div className="p-20 text-center flex flex-col items-center">
//               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
//                 <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"></div>
//               </div>
//               <p className="text-slate-400 text-sm font-medium italic">Baseline reached. No recent transactions found.</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-50">
//               {transactions.slice(0, 5).map((t, idx) => (
//                 <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
//                   <div className="flex items-center gap-4">
//                     <div className={`p-3 rounded-2xl ${t.type === "INCOME" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
//                       {t.type === "INCOME" ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
//                     </div>
//                     <div>
//                       <p className="text-slate-900 font-semibold text-sm">{t.description || t.category}</p>
//                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{new Date(t.date).toDateString()}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-bold text-sm ${t.type === "INCOME" ? "text-emerald-600" : "text-slate-900"}`}>
//                       {t.type === "INCOME" ? "+" : "-"} ₹{t.amount.toLocaleString()}
//                     </p>
//                     <p className="text-[10px] text-slate-400 font-medium">{t.category}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <AddTransaction isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRefresh={handleRefresh} />
//     </div>
//   );
// };

// export default Dashboard;















import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { Plus, UploadCloud, TrendingUp, Wallet, ReceiptIndianRupee, ArrowDownRight, ArrowUpRight } from "lucide-react";
import AddTransaction from "./AddTransaction";
import axios from "axios";

const StatCard = ({ label, value, icon: Icon, variant = "default" }) => (
  <div className={`h-44 border rounded-4xl p-8 flex flex-col justify-between transition-all duration-500 group ${
    variant === "income" ? "bg-emerald-50/30 border-emerald-100" : 
    variant === "expense" ? "bg-rose-50/30 border-rose-100" : 
    "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
  } hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}>
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl transition-colors duration-300 ${
        variant === "income" ? "bg-emerald-100 text-emerald-600" :
        variant === "expense" ? "bg-rose-100 text-rose-600" :
        "bg-slate-50 text-slate-600 group-hover:bg-slate-950 group-hover:text-white"
      }`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">{label}</p>
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

  // handleRefresh ko useCallback mein rakha hai for better performance
  const handleRefresh = useCallback(async () => {
    try {
      // 1. Backend update ke baad user profile fetch karo (Income/Expense updates)
      if (checkAuth) {
        await checkAuth(); 
      }
      
      // 2. Latest Transactions list fetch karo
      const res = await axios.get("http://localhost:4000/expense-api/expenses", { withCredentials: true });
      setTransactions(res.data.payload || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Sync Error:", err);
      setIsLoading(false);
    }
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      handleRefresh();
    }
  }, [isAuthenticated, navigate, handleRefresh]);

  const userName = currentUser?.username || currentUser?.name || "Ghost User";
  const income = currentUser?.income || 0;
  const expense = currentUser?.expense || 0;
  const savings = income - expense;

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-1000">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">Overview</h1>
          <p className="text-slate-400 text-sm font-medium italic">
            Active Node: <span className="text-slate-900 font-bold tracking-widest">{userName.toUpperCase()}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <UploadCloud size={18} /> Upload Receipt
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <Plus size={18} /> Add Transaction
          </button>
        </div>
      </div>

      {/* 2. Stats Grid - Real-time Data Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="Total Income" 
          value={`₹${income.toLocaleString('en-IN')}`} 
          icon={TrendingUp} 
          variant="income" 
        />
        <StatCard 
          label="Total Expense" 
          value={`₹${expense.toLocaleString('en-IN')}`} 
          icon={ReceiptIndianRupee} 
          variant="expense" 
        />
        <StatCard 
          label="Net Savings" 
          value={`₹${savings.toLocaleString('en-IN')}`} 
          icon={Wallet} 
        />
      </div>

      {/* 3. Data Stream / Transaction History */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Data Stream</h3>
            <p className="text-slate-400 text-[10px] tracking-[2px] font-bold uppercase">{currentUser?.email || "Encrypted Session"}</p>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">Recent Logs</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500">
          {isLoading ? (
            <div className="p-20 text-center flex flex-col items-center gap-2">
              <div className="w-2 h-2 bg-slate-950 rounded-full animate-ping"></div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[3px]">Syncing...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-sm font-medium italic">Baseline reached. No recent transactions found.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {transactions.slice(0, 5).map((t, idx) => (
                <div key={t._id || idx} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                      t.type === "INCOME" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      {t.type === "INCOME" ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{t.description || t.category}</p>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${t.type === "INCOME" ? "text-emerald-600" : "text-slate-900"}`}>
                      {t.type === "INCOME" ? "+" : "-"} ₹{t.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium italic uppercase">{t.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      <AddTransaction 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={handleRefresh} 
      />
    </div>
  );
};

export default Dashboard;