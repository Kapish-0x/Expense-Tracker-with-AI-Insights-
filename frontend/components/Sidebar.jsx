// import React from "react";
// import { NavLink } from "react-router-dom"; // Don't forget this!
// import { LayoutDashboard, Receipt, BrainCircuit, Bell, Settings } from "lucide-react";

// const Sidebar = () => {
//   const menuItems = [
//     { id: "dashboard", label: "DASHBOARD", icon: <LayoutDashboard size={16} />, path: "/dashboard" },
//     { id: "transactions", label: "TRANSACTIONS", icon: <Receipt size={16} />, path: "/transactions" },
//     { id: "ai", label: "AI INSIGHTS", icon: <BrainCircuit size={16} />, path: "/ai-insights" },
//     { id: "alerts", label: "NOTIFICATIONS", icon: <Bell size={16} />, path: "/alerts" },
//     { id: "settings", label: "SETTINGS", icon: <Settings size={16} />, path: "/settings" },
//   ];

//   return (
//     <nav className="w-70 h-full border-r border-[#1A1A1A] bg-[#000000] flex flex-col p-8 z-20">
//       <div className="mb-16">
//         <h2 className="text-white text-xl font-bold tracking-[4px] italic">CASHFLOW</h2>
//         <p className="text-[#444444] text-[9px] tracking-[3px] mt-1 uppercase">Expense Tracker</p>
//       </div>

//       <ul className="space-y-6 flex-1">
//         {menuItems.map((item) => (
//           <li key={item.id}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-4 transition-all duration-300 group
//                 ${isActive ? "text-white" : "text-[#444444] hover:text-[#888888]"}`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:translate-x-1"}`}>
//                     {item.icon}
//                   </span>
//                   <span className="text-[10px] tracking-[3px] font-medium uppercase">{item.label}</span>
//                   {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000] ml-auto"></div>}
//                 </>
//               )}
//             </NavLink>
//           </li>
//         ))}
//       </ul>

//       {/* User Info */}
//       <div className="pt-8 border-t border-[#1A1A1A] flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
//         <div className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[10px] text-white">KR</div>
//         <span className="text-white text-[10px] tracking-widest font-bold">KAPISH RAWAT</span>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;





import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, BrainCircuit, Bell, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} strokeWidth={1.5} />, path: "/dashboard" },
    { id: "transactions", label: "Transactions", icon: <Receipt size={18} strokeWidth={1.5} />, path: "/transactions" },
    { id: "ai", label: "AI Insights", icon: <BrainCircuit size={18} strokeWidth={1.5} />, path: "/ai-insights" },
    { id: "alerts", label: "Notifications", icon: <Bell size={18} strokeWidth={1.5} />, path: "/alerts" },
    { id: "settings", label: "Settings", icon: <Settings size={18} strokeWidth={1.5} />, path: "/settings" },
  ];

  return (
    <nav className="w-72 h-full bg-white flex flex-col p-8 z-20">
      
      {/* Brand Logo Section */}
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-slate-900 text-lg font-bold tracking-tight">Cashflow</h2>
        </div>
        <p className="text-slate-400 text-[10px] tracking-[2px] mt-2 font-bold uppercase">Expense Tracker</p>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-slate-50 text-slate-900 shadow-sm shadow-slate-100" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-all duration-300 ${isActive ? "text-slate-900 scale-110" : "group-hover:scale-110"}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[13px] font-semibold tracking-tight transition-all ${isActive ? "translate-x-1" : ""}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-5 bg-slate-950 rounded-full animate-in fade-in zoom-in duration-300"></div>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Info & Quick Actions */}
      <div className="pt-6 border-t border-slate-50">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600 overflow-hidden">
                KR
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 text-[12px] font-bold tracking-tight">K. Rawat</span>
            </div>
          </div>
          
          <button className="p-2 text-red-400 hover:text-red-500 transition-colors ">
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;