import React from "react";
import { NavLink } from "react-router-dom"; // Don't forget this!
import { LayoutDashboard, Receipt, BrainCircuit, Bell, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { id: "dashboard", label: "DASHBOARD", icon: <LayoutDashboard size={16} />, path: "/dashboard" },
    { id: "transactions", label: "TRANSACTIONS", icon: <Receipt size={16} />, path: "/transactions" },
    { id: "ai", label: "AI INSIGHTS", icon: <BrainCircuit size={16} />, path: "/ai-insights" },
    { id: "alerts", label: "NOTIFICATIONS", icon: <Bell size={16} />, path: "/alerts" },
    { id: "settings", label: "SETTINGS", icon: <Settings size={16} />, path: "/settings" },
  ];

  return (
    <nav className="w-70 h-full border-r border-[#1A1A1A] bg-[#000000] flex flex-col p-8 z-20">
      <div className="mb-16">
        <h2 className="text-white text-xl font-bold tracking-[4px] italic">CASHFLOW</h2>
        <p className="text-[#444444] text-[9px] tracking-[3px] mt-1 uppercase">Expense Tracker</p>
      </div>

      <ul className="space-y-6 flex-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 transition-all duration-300 group
                ${isActive ? "text-white" : "text-[#444444] hover:text-[#888888]"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:translate-x-1"}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] tracking-[3px] font-medium uppercase">{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000] ml-auto"></div>}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Info */}
      <div className="pt-8 border-t border-[#1A1A1A] flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[10px] text-white">KR</div>
        <span className="text-white text-[10px] tracking-widest font-bold">KAPISH RAWAT</span>
      </div>
    </nav>
  );
};

export default Sidebar;