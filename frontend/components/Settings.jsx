import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Target,
  Bell,
  Save,
  AlertTriangle,
  Trash2,
  Zap,
} from "lucide-react";
import { useAuth } from "../store/authStore";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();

  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [securityLoading, setSecurityLoading] = useState(false);

  // Form States - initialized with currentUser data
  const [budgetData, setBudgetData] = useState({
    monthlyBudget: currentUser?.monthlyBudget || 0,
    minSavings: currentUser?.minSavings || 0,
    savingsAlertEnabled: currentUser?.savingsAlertEnabled ?? true,
    budgetAlertEnabled: currentUser?.budgetAlertEnabled ?? true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // CRITICAL: Sync local state when currentUser changes (e.g., after a refresh or login)
  useEffect(() => {
    if (currentUser) {
      setBudgetData({
        monthlyBudget: currentUser.monthlyBudget || 0,
        minSavings: currentUser.minSavings || 0,
        savingsAlertEnabled: currentUser.savingsAlertEnabled ?? true,
        budgetAlertEnabled: currentUser.budgetAlertEnabled ?? true,
      });
    }
  }, [currentUser]);

  // Handler for Budget Updates (The Form)
  const handleUpdateBudget = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        "http://localhost:4000/user-api/budget",
        budgetData,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        updateUser(res.data.payload);

        alert(t("financial protocols updated"));
      }
    } catch (err) {
      console.error(err);

      alert(t("failed update budget"));
    } finally {
      setLoading(false);
    }
  };

  // Fixed Toggle Handler
  const handleTogglePreference = async (key) => {
    // 1. Calculate new value based on CURRENT state
    const newValue = !budgetData[key];

    // 2. Optimistic Update: Change UI immediately
    const updatedData = { ...budgetData, [key]: newValue };

    setBudgetData(updatedData);

    try {
      // 3. Send the patch request with the NEW values
      const res = await axios.patch(
        "http://localhost:4000/user-api/budget",
        updatedData,
        { withCredentials: true },
      );

      if (res.status === 200) {
        // 4. Update global auth state with response from server
        updateUser(res.data.payload);
      }
    } catch (err) {
      // Rollback if API fails
      console.error("Sync failed:", err);

      setBudgetData((prev) => ({
        ...prev,
        [key]: !newValue,
      }));

      alert(t("failed sync preference"));
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();

    setSecurityLoading(true);

    try {
      await axios.put(
        "http://localhost:4000/common-api/password",
        passwordData,
        {
          withCredentials: true,
        },
      );

      alert(t("password updated"));

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || t("update failed"));
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleTerminateAccount = async () => {
    const confirmFirst = window.confirm(
      t("terminate warning"),
    );

    if (!confirmFirst) return;

    const passwordVerify = window.prompt(
      t("enter password verify"),
    );

    if (passwordVerify) {
      try {
        const res = await axios.delete(
          "http://localhost:4000/user-api/terminate",
          {
            data: { password: passwordVerify },
            withCredentials: true,
          },
        );

        if (res.status === 200) {
          alert(t("account purged"));

          localStorage.removeItem("cashflow_user");

          window.location.href = "/login";
        }
      } catch (err) {
        alert(
          err.response?.data?.message ||
            t("invalid password deletion"),
        );
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
          {t("settings")}
        </h1>

        <p className="text-slate-500">
          {t("settings subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BUDGET PROTOCOLS */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Target size={20} />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              {t("budget limits")}
            </h2>
          </div>

          <form
            onSubmit={handleUpdateBudget}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                {t("monthly budget")}
              </label>

              <input
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={budgetData.monthlyBudget}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    monthlyBudget: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                {t("min savings")}
              </label>

              <input
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={budgetData.minSavings}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    minSavings: Number(e.target.value),
                  })
                }
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} />

              {loading
                ? t("syncing")
                : t("update limits")}
            </button>
          </form>
        </div>

        {/* SIGNAL PREFERENCES */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Bell size={20} />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              {t("alert prefs")}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Savings Toggle */}
            <div
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
              onClick={() =>
                handleTogglePreference(
                  "savingsAlertEnabled",
                )
              }
            >
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {t("savings warning")}
                </p>

                <p className="text-[10px] text-slate-400">
                  {t("savings warning desc")}
                </p>
              </div>

              <div
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                  budgetData.savingsAlertEnabled
                    ? "bg-emerald-500"
                    : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    budgetData.savingsAlertEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Budget Limit Toggle */}
            <div
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
              onClick={() =>
                handleTogglePreference(
                  "budgetAlertEnabled",
                )
              }
            >
              <div className="flex items-center gap-3">
                <Zap
                  size={16}
                  className={`${
                    budgetData.budgetAlertEnabled
                      ? "text-amber-500"
                      : "text-slate-400"
                  }`}
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {t("budget limit")}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {t("budget limit desc")}
                  </p>
                </div>
              </div>

              <div
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                  budgetData.budgetAlertEnabled
                    ? "bg-emerald-500"
                    : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    budgetData.budgetAlertEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY & DANGER ZONE */}
        <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck
              className="text-emerald-400"
              size={24}
            />

            <h2 className="text-xl font-semibold font-mono tracking-tight">
              {t("change password")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form
              onSubmit={handleUpdateSecurity}
              className="space-y-4 border-r border-white/10 pr-0 md:pr-10"
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {t("current password")}
                </label>

                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {t("new password")}
                </label>

                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                disabled={securityLoading}
                className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all"
              >
                {securityLoading
                  ? t("processing")
                  : t("save")}
              </button>
            </form>

            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <div className="p-4 bg-red-500/10 rounded-3xl border border-red-500/20">
                <AlertTriangle
                  className="text-red-500"
                  size={32}
                />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-400">
                  {t("account deletion")}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {t("account deletion desc")}
                </p>
              </div>

              <button
                onClick={handleTerminateAccount}
                className="flex items-center gap-2 text-red-500 text-[11px] font-bold border border-red-500/30 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 size={14} />

                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;