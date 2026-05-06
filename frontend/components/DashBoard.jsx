// // const StatCard = ({ label, value, color = "white" }) => (
// //   <div className="h-37.5 bg-[#111111] border border-[#222222] rounded-3xl p-8 flex flex-col justify-between hover:border-[#333333] transition-all group">
// //     <p className="text-[#444444] text-[10px] tracking-[30.1%] font-bold uppercase">{label}</p>
// //     <h2 className={`text-3xl font-bold tracking-tighter text-${color}`}>
// //       {value}
// //     </h2>
// //   </div>
// // );

// // const Dashboard = () => {
// //   return (
// //     <div className="flex flex-col gap-10">
// //       {/* 1. Header Section */}
// //       <div className="flex justify-between items-end">
// //         <h1 className="text-5xl font-bold tracking-[-3px] text-white underline decoration-[#FF0000] decoration-2 underline-offset-8">
// //           OVERVIEW
// //         </h1>
// //       </div>

// //       {/* 2. Stats Grid (The 3 Cards) */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <StatCard label="TOTAL INCOME" value="₹50,000" />
// //         <StatCard label="TOTAL EXPENSE" value="₹29,000"/>
// //         <StatCard label="NET SAVINGS" value="₹21,000" />
// //       </div>

// //       {/* 3. Placeholder for Chart / AI Section */}
// //       <div className="w-full h-75 bg-[#080808] border border-[#1A1A1A] rounded-[40px] p-8 flex items-center justify-center">
// //         <p className="text-[#222222] text-[10px] tracking-[5px] uppercase animate-pulse">
// //           Waiting for transaction data...
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";

// const StatCard = ({ label, value, color = "white" }) => (
//   <div className="h-37.5 bg-[#111111] border border-[#222222] rounded-3xl p-8 flex flex-col justify-between hover:border-[#333333] transition-all group">
//     <p className="text-[#444444] text-[10px] tracking-[30.1%] font-bold uppercase">{label}</p>
//     <h2 className={`text-3xl font-bold tracking-tighter text-${color}`}>
//       {value}
//     </h2>
//   </div>
// );

// const Dashboard = () => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   // 🔐 Protect route
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="flex flex-col gap-10">
//       {/* 1. Header Section */}
//       <div className="flex justify-between items-end">
//         <h1 className="text-5xl font-bold tracking-[-3px] text-white underline decoration-[#FF0000] decoration-2 underline-offset-8">
//           OVERVIEW
//         </h1>
//       </div>

//       {/* 2. Stats Grid (The 3 Cards) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard label="TOTAL INCOME" value="₹50,000" />
//         <StatCard label="TOTAL EXPENSE" value="₹29,000" />
//         <StatCard label="NET SAVINGS" value="₹21,000" />
//       </div>

//       {/* 3. Placeholder for Chart / AI Section */}
//       <div className="w-full h-75 bg-[#080808] border border-[#1A1A1A] rounded-[40px] p-8 flex items-center justify-center">
//         <p className="text-[#222222] text-[10px] tracking-[5px] uppercase animate-pulse">
//           Waiting for transaction data...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { Plus, UploadCloud, TrendingUp, Wallet, ReceiptIndianRupee } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, trend }) => (
  <div className="h-44 bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-400 text-[11px] tracking-[2px] font-bold uppercase mb-1">{label}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </h2>
    </div>
  </div>
);

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      
      {/* 1. Header Section with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">
            Overview
          </h1>
          <p className="text-slate-400 text-sm font-medium">Monitoring your financial nodes in real-time.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <UploadCloud size={18} strokeWidth={2} />
            Upload Receipt
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
            <Plus size={18} strokeWidth={2} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="Total Income" 
          value="₹50,000" 
          icon={TrendingUp}  
        />
        <StatCard 
          label="Total Expense" 
          value="₹29,000" 
          icon={ReceiptIndianRupee} 
        />
        <StatCard 
          label="Net Savings" 
          value="₹21,000" 
          icon={Wallet} 
        />
      </div>

      {/* 3. Empty State / Chart Section */}
      <div className="w-full h-80 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center group">
        <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
          <div className="w-2 h-2 bg-slate-200 rounded-full animate-ping"></div>
        </div>
        <p className="text-slate-400 text-[11px] tracking-[4px] uppercase font-bold">
          Synchronizing Data Streams...
        </p>
        <p className="text-slate-300 text-xs mt-2 font-medium">Waiting for your first transaction entry.</p>
      </div>
    </div>
  );
};

export default Dashboard;