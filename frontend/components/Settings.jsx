// import React, { useState } from "react";
// import { ShieldCheck, Target, Bell, Lock, Save, AlertTriangle } from "lucide-react";
// import { useAuth } from "../store/authStore";
// import axios from "axios";

// const Settings = () => {
//   const { currentUser, updateUser } = useAuth();
//   const [loading, setLoading] = useState(false);
  
//   // Form States
//   const [budgetData, setBudgetData] = useState({
//     monthlyBudget: currentUser?.monthlyBudget || 0,
//     minSavings: currentUser?.minSavings || 0,
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });

//   const handleUpdateBudget = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.patch("http://localhost:4000/user-api/budget", budgetData, {
//         withCredentials: true
//       });
//       if (res.status === 200) {
//         updateUser(res.data.payload); 
//         alert("Financial protocols updated!");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
//       <header>
//         <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
//         <p className="text-slate-500">Configure your financial guardrails and security protocols.</p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* SECTION 1: FINANCIAL PROTOCOLS (Budget & Savings) */}
//         <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
//               <Target size={20} />
//             </div>
//             <h2 className="text-lg font-semibold text-slate-800">Protocol Limits</h2>
//           </div>

//           <form onSubmit={handleUpdateBudget} className="space-y-5">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monthly Budget</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
//                 value={budgetData.monthlyBudget}
//                 onChange={(e) => setBudgetData({...budgetData, monthlyBudget: e.target.value})}
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Min Savings Floor</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
//                 value={budgetData.minSavings}
//                 onChange={(e) => setBudgetData({...budgetData, minSavings: e.target.value})}
//               />
//               <p className="text-[10px] text-slate-400 italic mt-1">Alarm will trigger when Net Savings hit this level.</p>
//             </div>

//             <button 
//               disabled={loading}
//               className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
//             >
//               <Save size={16} /> Update Guardrails
//             </button>
//           </form>
//         </div>

//         {/* SECTION 2: NOTIFICATION PREFERENCES */}
//         <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
//               <Bell size={20} />
//             </div>
//             <h2 className="text-lg font-semibold text-slate-800">Signal Prefs</h2>
//           </div>

//           <div className="space-y-4">
//             {[
//               { label: "Budget Breached (90%)", desc: "Notify when spending hits limit" },
//               { label: "Savings Floor Warning", desc: "Alarm on critical savings level" },
//               { label: "Daily Summary", desc: "EOD financial status report" }
//             ].map((item, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
//                 <div>
//                   <p className="text-sm font-medium text-slate-700">{item.label}</p>
//                   <p className="text-[10px] text-slate-400">{item.desc}</p>
//                 </div>
//                 <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
//                   <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SECTION 3: SECURITY (Full Width) */}
//         <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <ShieldCheck className="text-emerald-400" size={24} />
//             <h2 className="text-xl font-semibold">Security Protocol</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">Access Key (Current)</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all"
//                   placeholder="••••••••"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">New Access Key</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all"
//                   placeholder="New Password"
//                 />
//               </div>
//               <button className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all">
//                 Update Security 
//               </button>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center">
//               <AlertTriangle className="text-amber-400 mb-2" size={32} />
//               <p className="text-sm font-medium">Danger Zone</p>
//               <p className="text-[11px] text-slate-400 mt-1 mb-4">Deactivating your node will wipe all cached transaction data.</p>
//               <button className="text-red-400 text-[11px] font-bold border border-red-400/30 px-4 py-2 rounded-lg hover:bg-red-400 hover:text-white transition-all">
//                 TERMINATE_ACCOUNT
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Settings;







import React, { useState } from "react";
import { ShieldCheck, Target, Bell, Lock, Save, AlertTriangle } from "lucide-react";
import { useAuth } from "../store/authStore";
import axios from "axios";

const Settings = () => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [securityLoading, setSecurityLoading] = useState(false);
  
  // Form States
  const [budgetData, setBudgetData] = useState({
    monthlyBudget: currentUser?.monthlyBudget || 0,
    minSavings: currentUser?.minSavings || 0,
  });

  // Backend expects 'currentPassword' and 'newPassword'
  const [passwordData, setPasswordData] = useState({
    currentPassword: "", 
    newPassword: "",
  });

  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch("http://localhost:4000/user-api/budget", budgetData, {
        withCredentials: true
      });
      if (res.status === 200) {
        updateUser(res.data.payload); 
        alert("Financial protocols updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update budget protocols.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return alert("Both password fields are mandatory.");
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      return alert("New password cannot be the same as current password.");
    }

    setSecurityLoading(true);
    try {
      // Changed to .put and used 'currentPassword' to match your backend API
      const res = await axios.put("http://localhost:4000/common-api/password", passwordData, {
        withCredentials: true
      });
      
      if (res.status === 200) {
        alert("Security Access Key updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "" }); // Reset fields
      }
    } catch (err) {
      console.error("Security Update Error:", err);
      // Displaying the exact message from your backend logic
      alert(err.response?.data?.message || "Security protocol breach: Password update failed.");
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Configure your financial guardrails and security protocols.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SECTION 1: FINANCIAL PROTOCOLS */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Target size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Protocol Limits</h2>
          </div>

          <form onSubmit={handleUpdateBudget} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monthly Budget</label>
              <input 
                type="number" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={budgetData.monthlyBudget}
                onChange={(e) => setBudgetData({...budgetData, monthlyBudget: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Min Savings Floor</label>
              <input 
                type="number" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={budgetData.minSavings}
                onChange={(e) => setBudgetData({...budgetData, minSavings: e.target.value})}
              />
              <p className="text-[10px] text-slate-400 italic mt-1">Alarm will trigger when Net Savings hit this level.</p>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={16} /> {loading ? "Updating..." : "Update Guardrails"}
            </button>
          </form>
        </div>

        {/* SECTION 2: NOTIFICATION PREFERENCES */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Signal Prefs</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: "Budget Breached (90%)", desc: "Notify when spending hits limit" },
              { label: "Savings Floor Warning", desc: "Alarm on critical savings level" },
              { label: "Daily Summary", desc: "EOD financial status report" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: SECURITY PROTOCOL */}
        <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-emerald-400" size={24} />
            <h2 className="text-xl font-semibold">Security Protocol</h2>
          </div>

          <form onSubmit={handleUpdateSecurity} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">Access Key (Current)</label>
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">New Access Key</label>
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-white/20"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={securityLoading}
                className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all disabled:opacity-50"
              >
                {securityLoading ? "Updating Node..." : "Update Security"} 
              </button>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center">
              <AlertTriangle className="text-amber-400 mb-2" size={32} />
              <p className="text-sm font-medium">Danger Zone</p>
              <p className="text-[11px] text-slate-400 mt-1 mb-4">Deactivating your node will wipe all cached transaction data.</p>
              <button 
                type="button"
                className="text-red-400 text-[11px] font-bold border border-red-400/30 px-4 py-2 rounded-lg hover:bg-red-400 hover:text-white transition-all"
              >
                TERMINATE_ACCOUNT
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;