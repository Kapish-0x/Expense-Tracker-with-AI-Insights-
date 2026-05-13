import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BrainCircuit,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  BarChart,
} from "lucide-react";
import { useAuth } from "../store/authStore";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "??";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} strokeWidth={1.5} />,
      path: "/dashboard",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={18} strokeWidth={1.5} />,
      path: "/analytics",
    },
    {
      id: "ai",
      label: "AI Insights",
      icon: <BrainCircuit size={18} strokeWidth={1.5} />,
      path: "/ai-insights",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart size={18} strokeWidth={1.5} />,
      path: "/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} strokeWidth={1.5} />,
      path: "/settings",
    },
  ];

  return (
    <nav className="w-72 h-full bg-white flex flex-col p-8 z-20 border-r border-slate-50">
      {/* Brand Logo Section */}
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-slate-900 text-lg font-bold tracking-tight">
            Cashflow
          </h2>
        </div>

        <p className="text-slate-400 text-[10px] tracking-[2px] mt-2 font-bold uppercase">
          Expense Tracker
        </p>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            id=
            {
              item.id === "analytics"
                ? "analytics-nav"
                : item.id === "ai"
                  ? "ai-nav"
                  : item.id === "reports"
                    ? "reports-nav"
                    : item.id === "settings"
                      ? "settings-nav"
                      : ""
             } >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-slate-50 text-slate-900 shadow-sm shadow-slate-100"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-slate-900 scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-[13px] font-semibold tracking-tight transition-all ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  >
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

      {/* User Section */}
      <div className="pt-6 border-t border-slate-50">
        <div className="flex items-center justify-between group">
          {/* Clickable Profile */}
          <div
            id="profile-section"
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all duration-300"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[11px] font-bold text-white overflow-hidden uppercase">
                {getInitials(currentUser?.name || currentUser?.username)}
              </div>

              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            {/* User Details */}
            <div className="flex flex-col">
              <span className="text-slate-900 text-[12px] font-bold tracking-tight truncate w-32">
                {currentUser?.name || currentUser?.username || "Guest User"}
              </span>

              <span className="text-slate-400 text-[10px] truncate w-32">
                {currentUser?.email || "No Email"}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:rotate-12 duration-300"
            title="Logout Session"
          >
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
