import React, { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  BrainCircuit,
  Bell,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("DASHBOARD");

  const menuItems = [
    {
      id: "DASHBOARD",
      label: "DASHBOARD",
      icon: <LayoutDashboard size={16} />,
    },
    { id: "EXPENSES", label: "TRANSACTIONS", icon: <Receipt size={16} /> },
    { id: "AI", label: "AI INSIGHTS", icon: <BrainCircuit size={16} /> },
    { id: "ALERTS", label: "NOTIFICATIONS", icon: <Bell size={16} /> },
    { id: "SETTINGS", label: "SETTINGS", icon: <Settings size={16} /> },
  ];

  return (
    <nav className="w-65px h-full border-r border-[#1A1A1A] bg-[#000000] flex flex-col p-8 z-20">
      <div className="mb-16">
        <h2 className="text-white text-xl font-bold tracking-[4px] italic">
          CashFlow
        </h2>
        <p className="text-[#444444] text-[9px] tracking-[3px] mt-1">
          Expense Tracker
        </p>
      </div>

      <ul className="space-y-6 flex-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-4 cursor-pointer transition-all duration-300 group
              ${active === item.id ? "text-white" : "text-[#444444] hover:text-[#888888]"}`}
          >
            <span
              className={`transition-transform duration-300 ${active === item.id ? "scale-110" : "group-hover:translate-x-1"}`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] tracking-[3px] font-medium">
              {item.label}
            </span>
            {active === item.id && (
              <div className="w-1 h-1 rounded-full bg-[#FF0000] ml-auto"></div>
            )}
          </li>
        ))}
      </ul>

      <div className="pt-8 border-t border-[#1A1A1A] flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[10px] text-white">
          KR
        </div>
        <div className="flex flex-col">
          <span className="text-white text-[10px] tracking-widest font-bold">
            KAPISH RAWAT
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
