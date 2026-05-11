// import React, { useState } from "react";
// import {
//   ShieldCheck,
//   Target,
//   Bell,
//   Lock,
//   Save,
//   AlertTriangle,
//   Trash2,
// } from "lucide-react";
// import { useAuth } from "../store/authStore";
// import axios from "axios";

// const Settings = () => {
//   const { currentUser, updateUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [securityLoading, setSecurityLoading] = useState(false);

//   // Form States
//   const [budgetData, setBudgetData] = useState({
//     monthlyBudget: currentUser?.monthlyBudget || 0,
//     minSavings: currentUser?.minSavings || 0,
//     savingsAlertEnabled: currentUser?.savingsAlertEnabled ?? true,
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });

//   // Handler for Budget and Numeric Updates
//   const handleUpdateBudget = async (e) => {
//     if (e) e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.patch(
//         "http://localhost:4000/user-api/budget",
//         budgetData,
//         {
//           withCredentials: true,
//         },
//       );
//       if (res.status === 200) {
//         updateUser(res.data.payload);
//         alert("Financial protocols updated and synced!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update financial protocols.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // INSTANT TOGGLE HANDLER - Syncs with DB immediately
//   const handleToggleAlert = async () => {
//     const newValue = !budgetData.savingsAlertEnabled;

//     // 1. Update UI locally first
//     setBudgetData((prev) => ({
//       ...prev,
//       savingsAlertEnabled: newValue,
//     }));

//     // 2. Sync with Backend immediately
//     try {
//       const res = await axios.patch(
//         "http://localhost:4000/user-api/budget",
//         { ...budgetData, savingsAlertEnabled: newValue },
//         { withCredentials: true },
//       );

//       if (res.status === 200) {
//         updateUser(res.data.payload); // Sync global auth state
//       }
//     } catch (err) {
//       console.error("Toggle sync failed:", err);
//       // Revert UI if API fails
//       setBudgetData((prev) => ({
//         ...prev,
//         savingsAlertEnabled: !newValue,
//       }));
//       alert("Failed to sync alert preference.");
//     }
//   };

//   const handleUpdateSecurity = async (e) => {
//     e.preventDefault();
//     if (!passwordData.currentPassword || !passwordData.newPassword) {
//       return alert("Both password fields are mandatory.");
//     }
//     if (passwordData.currentPassword === passwordData.newPassword) {
//       return alert("New password cannot be the same as current password.");
//     }

//     setSecurityLoading(true);
//     try {
//       const res = await axios.put(
//         "http://localhost:4000/common-api/password",
//         passwordData,
//         {
//           withCredentials: true,
//         },
//       );
//       if (res.status === 200) {
//         alert("Security Access Key updated successfully!");
//         setPasswordData({ currentPassword: "", newPassword: "" });
//       }
//     } catch (err) {
//       console.error("Security Update Error:", err);
//       alert(err.response?.data?.message || "Password update failed.");
//     } finally {
//       setSecurityLoading(false);
//     }
//   };

//   const handleTerminateAccount = async () => {
//     const confirmTermination = window.confirm(
//       "CRITICAL WARNING: This will permanently delete your account and all financial data. Proceed?",
//     );
//     if (confirmTermination) {
//       try {
//         const res = await axios.delete(
//           "http://localhost:4000/user-api/terminate",
//           {
//             withCredentials: true,
//           },
//         );
//         if (res.status === 200) {
//           alert("Account purged.");
//           window.location.href = "/login";
//         }
//       } catch (err) {
//         console.error("Termination Error:", err);
//         alert("Failed to terminate account.");
//       }
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
//       <header>
//         <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
//           SYSTEM_SETTINGS
//         </h1>
//         <p className="text-slate-500">
//           Configure financial guardrails and node security.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* SECTION 1: FINANCIAL PROTOCOLS */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
//               <Target size={20} />
//             </div>
//             <h2 className="text-lg font-semibold text-slate-800">
//               Protocol Limits
//             </h2>
//           </div>

//           <form onSubmit={handleUpdateBudget} className="space-y-5">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                 Monthly Budget Limit
//               </label>
//               <input
//                 type="number"
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
//                 value={budgetData.monthlyBudget}
//                 onChange={(e) =>
//                   setBudgetData({
//                     ...budgetData,
//                     monthlyBudget: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                 Min Savings Floor
//               </label>
//               <input
//                 type="number"
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
//                 value={budgetData.minSavings}
//                 onChange={(e) =>
//                   setBudgetData({ ...budgetData, minSavings: e.target.value })
//                 }
//               />
//               <p className="text-[10px] text-slate-400 italic mt-1">
//                 Dashboard alert triggers below this value.
//               </p>
//             </div>

//             <button
//               disabled={loading}
//               className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               <Save size={16} /> {loading ? "Syncing..." : "Update Guardrails"}
//             </button>
//           </form>
//         </div>

//         {/* SECTION 2: SIGNAL PREFERENCES (Alert Toggles) */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
//               <Bell size={20} />
//             </div>
//             <h2 className="text-lg font-semibold text-slate-800">
//               Signal Prefs
//             </h2>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
//               <div>
//                 <p className="text-sm font-medium text-slate-700">
//                   Savings Floor Warning
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Toggle dashboard alerts for low savings.
//                 </p>
//               </div>
//               <div
//                 onClick={handleToggleAlert}
//                 className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${budgetData.savingsAlertEnabled ? "bg-emerald-500" : "bg-slate-200"}`}
//               >
//                 <div
//                   className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${budgetData.savingsAlertEnabled ? "left-6" : "left-1"}`}
//                 ></div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between p-3 opacity-50 cursor-not-allowed">
//               <div>
//                 <p className="text-sm font-medium text-slate-700">
//                   Weekly Summary
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Receive EOW performance reports.
//                 </p>
//               </div>
//               <div className="w-10 h-5 bg-slate-200 rounded-full relative">
//                 <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"></div>
//               </div>
//             </div>
//           </div>
//           <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest italic">
//             Toggles sync instantly with your node.
//           </p>
//         </div>

//         {/* SECTION 3: SECURITY PROTOCOL */}
//         <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <ShieldCheck className="text-emerald-400" size={24} />
//             <h2 className="text-xl font-semibold">Security Protocol</h2>
//           </div>

//           <form
//             onSubmit={handleUpdateSecurity}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">
//                   Current Access Key
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-white/20"
//                   placeholder="••••••••"
//                   value={passwordData.currentPassword}
//                   onChange={(e) =>
//                     setPasswordData({
//                       ...passwordData,
//                       currentPassword: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">
//                   New Access Key
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-white/20"
//                   placeholder="New Password"
//                   value={passwordData.newPassword}
//                   onChange={(e) =>
//                     setPasswordData({
//                       ...passwordData,
//                       newPassword: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={securityLoading}
//                 className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all disabled:opacity-50"
//               >
//                 {securityLoading ? "Updating Node..." : "Update Security"}
//               </button>
//             </div>

//             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
//               <AlertTriangle className="text-amber-400 mb-2" size={32} />
//               <p className="text-sm font-medium">Danger Zone</p>
//               <p className="text-[11px] text-slate-400 mt-1 mb-4 max-w-[200px]">
//                 Terminating your node will permanently purge all financial
//                 records.
//               </p>
//               <button
//                 type="button"
//                 onClick={handleTerminateAccount}
//                 className="flex items-center gap-2 text-red-400 text-[11px] font-bold border border-red-400/30 px-6 py-2.5 rounded-xl hover:bg-red-400 hover:text-white transition-all"
//               >
//                 <Trash2 size={14} /> TERMINATE_ACCOUNT
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;













// import React, { useState } from "react";
// import { ShieldCheck, Target, Bell, Save, AlertTriangle, Trash2, Moon } from "lucide-react";
// import { useAuth } from "../store/authStore";
// import axios from "axios";

// const Settings = () => {
//   const { currentUser, updateUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [securityLoading, setSecurityLoading] = useState(false);
  
//   // Form States
//   const [budgetData, setBudgetData] = useState({
//     monthlyBudget: currentUser?.monthlyBudget || 0,
//     minSavings: currentUser?.minSavings || 0,
//     savingsAlertEnabled: currentUser?.savingsAlertEnabled ?? true,
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "", 
//     newPassword: "",
//   });

//   // Handler for Budget Updates
//   const handleUpdateBudget = async (e) => {
//     if (e) e.preventDefault();
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
//       alert("Failed to update budget.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle Savings Alert
//   const handleToggleAlert = async () => {
//     const newValue = !budgetData.savingsAlertEnabled;
//     setBudgetData(prev => ({ ...prev, savingsAlertEnabled: newValue }));

//     try {
//       const res = await axios.patch("http://localhost:4000/user-api/budget", 
//         { ...budgetData, savingsAlertEnabled: newValue }, 
//         { withCredentials: true }
//       );
//       if (res.status === 200) updateUser(res.data.payload);
//     } catch (err) {
//       setBudgetData(prev => ({ ...prev, savingsAlertEnabled: !newValue }));
//     }
//   };

//   const handleUpdateSecurity = async (e) => {
//     e.preventDefault();
//     setSecurityLoading(true);
//     try {
//       await axios.put("http://localhost:4000/common-api/password", passwordData, {
//         withCredentials: true
//       });
//       alert("Password updated!");
//       setPasswordData({ currentPassword: "", newPassword: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed.");
//     } finally {
//       setSecurityLoading(false);
//     }
//   };

//   // 🔥 TERMINATION WITH PASSWORD VERIFICATION
//   const handleTerminateAccount = async () => {
//     const confirmFirst = window.confirm("CRITICAL: This will wipe all data. Proceed?");
//     if (!confirmFirst) return;

//     const passwordVerify = window.prompt("To verify, please enter your password:");
    
//     if (passwordVerify) {
//       try {
//         const res = await axios.delete("http://localhost:4000/user-api/terminate", {
//           data: { password: passwordVerify }, // Verification password sent to body
//           withCredentials: true
//         });

//         if (res.status === 200) {
//           alert("Account purged successfully.");
//           localStorage.removeItem("cashflow_user");
//           window.location.href = "/login"; 
//         }
//       } catch (err) {
//         alert(err.response?.data?.message || "Invalid password. Termination aborted.");
//       }
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
//       <header>
//         <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">SYSTEM_SETTINGS</h1>
//         <p className="text-slate-500">Manage financial guardrails and node security.</p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* BUDGET PROTOCOLS */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Target size={20} /></div>
//             <h2 className="text-lg font-semibold text-slate-800">Protocol Limits</h2>
//           </div>

//           <form onSubmit={handleUpdateBudget} className="space-y-5">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase">Monthly Budget Limit</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 value={budgetData.monthlyBudget}
//                 onChange={(e) => setBudgetData({...budgetData, monthlyBudget: e.target.value})}
//               />
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase">Min Savings Floor</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 value={budgetData.minSavings}
//                 onChange={(e) => setBudgetData({...budgetData, minSavings: e.target.value})}
//               />
//             </div>
//             <button className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
//               <Save size={16} /> {loading ? "Syncing..." : "Update Guardrails"}
//             </button>
//           </form>
//         </div>

//         {/* SIGNAL PREFERENCES (Alerts & Dark Mode) */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={20} /></div>
//             <h2 className="text-lg font-semibold text-slate-800">Interface Prefs</h2>
//           </div>

//           <div className="space-y-4">
//             {/* Savings Toggle */}
//             <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
//               <div>
//                 <p className="text-sm font-medium text-slate-700">Savings Floor Warning</p>
//                 <p className="text-[10px] text-slate-400">Alerts when below floor limit.</p>
//               </div>
//               <div 
//                 onClick={handleToggleAlert}
//                 className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${budgetData.savingsAlertEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
//               >
//                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${budgetData.savingsAlertEnabled ? 'left-6' : 'left-1'}`}></div>
//               </div>
//             </div>

//             {/* Dark Mode Toggle (Weekly Summary replacement) */}
//             <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group">
//               <div className="flex items-center gap-3">
//                 <Moon size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
//                 <div>
//                   <p className="text-sm font-medium text-slate-700">Dark Mode</p>
//                   <p className="text-[10px] text-slate-400">Aesthetic monochromatic theme.</p>
//                 </div>
//               </div>
//               <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
//                 <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SECURITY & DANGER ZONE */}
//         <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="text-emerald-400" size={24} />
//             <h2 className="text-xl font-semibold font-mono tracking-tight">SECURITY_VAULT</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             <form onSubmit={handleUpdateSecurity} className="space-y-4 border-r border-white/10 pr-0 md:pr-10">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Key</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
//                   value={passwordData.currentPassword}
//                   onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Key</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
//                   value={passwordData.newPassword}
//                   onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
//                   required
//                 />
//               </div>
//               <button disabled={securityLoading} className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all">
//                 {securityLoading ? "Processing..." : "Sync New Credentials"}
//               </button>
//             </form>

//             <div className="flex flex-col justify-center items-center text-center space-y-4">
//               <div className="p-4 bg-red-500/10 rounded-3xl border border-red-500/20">
//                 <AlertTriangle className="text-red-500" size={32} />
//               </div>
//               <div>
//                 <p className="text-sm font-bold uppercase tracking-wider text-red-400">Node Termination</p>
//                 <p className="text-xs text-slate-400 mt-1">Requires password verification.</p>
//               </div>
//               <button 
//                 onClick={handleTerminateAccount}
//                 className="flex items-center gap-2 text-red-500 text-[11px] font-bold border border-red-500/30 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
//               >
//                 <Trash2 size={14} /> PURGE_ACCOUNT
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Settings;





// import React, { useState } from "react";
// import { ShieldCheck, Target, Bell, Save, AlertTriangle, Trash2, Zap } from "lucide-react";
// import { useAuth } from "../store/authStore";
// import axios from "axios";

// const Settings = () => {
//   const { currentUser, updateUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [securityLoading, setSecurityLoading] = useState(false);
  
//   // Form States
//   const [budgetData, setBudgetData] = useState({
//     monthlyBudget: currentUser?.monthlyBudget || 0,
//     minSavings: currentUser?.minSavings || 0,
//     savingsAlertEnabled: currentUser?.savingsAlertEnabled ?? true,
//     budgetAlertEnabled: currentUser?.budgetAlertEnabled ?? true, // New Toggle State
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "", 
//     newPassword: "",
//   });

//   // Handler for Budget Updates
//   const handleUpdateBudget = async (e) => {
//     if (e) e.preventDefault();
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
//       alert("Failed to update budget.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generic Toggle Handler for Alerts
//   const handleTogglePreference = async (key) => {
//     const newValue = !budgetData[key];
//     const updatedData = { ...budgetData, [key]: newValue };
    
//     setBudgetData(updatedData);

//     try {
//       const res = await axios.patch("http://localhost:4000/user-api/budget", 
//         updatedData, 
//         { withCredentials: true }
//       );
//       if (res.status === 200) updateUser(res.data.payload);
//     } catch (err) {
//       // Rollback if API fails
//       setBudgetData(prev => ({ ...prev, [key]: !newValue }));
//       alert("Failed to sync preference.");
//     }
//   };

//   const handleUpdateSecurity = async (e) => {
//     e.preventDefault();
//     setSecurityLoading(true);
//     try {
//       await axios.put("http://localhost:4000/common-api/password", passwordData, {
//         withCredentials: true
//       });
//       alert("Password updated!");
//       setPasswordData({ currentPassword: "", newPassword: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed.");
//     } finally {
//       setSecurityLoading(false);
//     }
//   };

//   const handleTerminateAccount = async () => {
//     const confirmFirst = window.confirm("CRITICAL: This will wipe all data. Proceed?");
//     if (!confirmFirst) return;

//     const passwordVerify = window.prompt("To verify, please enter your password:");
    
//     if (passwordVerify) {
//       try {
//         const res = await axios.delete("http://localhost:4000/user-api/terminate", {
//           data: { password: passwordVerify },
//           withCredentials: true
//         });

//         if (res.status === 200) {
//           alert("Account purged successfully.");
//           localStorage.removeItem("cashflow_user");
//           window.location.href = "/login"; 
//         }
//       } catch (err) {
//         alert(err.response?.data?.message || "Invalid password. Termination aborted.");
//       }
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
//       <header>
//         <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">SYSTEM_SETTINGS</h1>
//         <p className="text-slate-500">Manage financial guardrails and node security.</p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* BUDGET PROTOCOLS */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Target size={20} /></div>
//             <h2 className="text-lg font-semibold text-slate-800">Protocol Limits</h2>
//           </div>

//           <form onSubmit={handleUpdateBudget} className="space-y-5">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase">Monthly Budget Limit</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 value={budgetData.monthlyBudget}
//                 onChange={(e) => setBudgetData({...budgetData, monthlyBudget: e.target.value})}
//               />
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase">Min Savings Floor</label>
//               <input 
//                 type="number" 
//                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 value={budgetData.minSavings}
//                 onChange={(e) => setBudgetData({...budgetData, minSavings: e.target.value})}
//               />
//             </div>
//             <button className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
//               <Save size={16} /> {loading ? "Syncing..." : "Update Guardrails"}
//             </button>
//           </form>
//         </div>

//         {/* SIGNAL PREFERENCES */}
//         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={20} /></div>
//             <h2 className="text-lg font-semibold text-slate-800">Alert Prefs</h2>
//           </div>

//           <div className="space-y-4">
//             {/* Savings Toggle */}
//             <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
//                  onClick={() => handleTogglePreference('savingsAlertEnabled')}>
//               <div>
//                 <p className="text-sm font-medium text-slate-700">Savings Floor Warning</p>
//                 <p className="text-[10px] text-slate-400">Alerts when below floor limit.</p>
//               </div>
//               <div className={`w-10 h-5 rounded-full relative transition-all ${budgetData.savingsAlertEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
//                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${budgetData.savingsAlertEnabled ? 'left-6' : 'left-1'}`}></div>
//               </div>
//             </div>

//             {/* Budget Limit Toggle (Dark Mode Ki Jagah) */}
//             <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
//                  onClick={() => handleTogglePreference('budgetAlertEnabled')}>
//               <div className="flex items-center gap-3">
//                 <Zap size={16} className={`${budgetData.budgetAlertEnabled ? 'text-amber-500' : 'text-slate-400'}`} />
//                 <div>
//                   <p className="text-sm font-medium text-slate-700">Budget Limit Breach</p>
//                   <p className="text-[10px] text-slate-400">Notify when spending exceeds limit.</p>
//                 </div>
//               </div>
//               <div className={`w-10 h-5 rounded-full relative transition-all ${budgetData.budgetAlertEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
//                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${budgetData.budgetAlertEnabled ? 'left-6' : 'left-1'}`}></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SECURITY & DANGER ZONE */}
//         <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="text-emerald-400" size={24} />
//             <h2 className="text-xl font-semibold font-mono tracking-tight">SECURITY_VAULT</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             <form onSubmit={handleUpdateSecurity} className="space-y-4 border-r border-white/10 pr-0 md:pr-10">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Key</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
//                   value={passwordData.currentPassword}
//                   onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Key</label>
//                 <input 
//                   type="password" 
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
//                   value={passwordData.newPassword}
//                   onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
//                   required
//                 />
//               </div>
//               <button disabled={securityLoading} className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all">
//                 {securityLoading ? "Processing..." : "Sync New Credentials"}
//               </button>
//             </form>

//             <div className="flex flex-col justify-center items-center text-center space-y-4">
//               <div className="p-4 bg-red-500/10 rounded-3xl border border-red-500/20">
//                 <AlertTriangle className="text-red-500" size={32} />
//               </div>
//               <div>
//                 <p className="text-sm font-bold uppercase tracking-wider text-red-400">Node Termination</p>
//                 <p className="text-xs text-slate-400 mt-1">Requires password verification.</p>
//               </div>
//               <button 
//                 onClick={handleTerminateAccount}
//                 className="flex items-center gap-2 text-red-500 text-[11px] font-bold border border-red-500/30 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
//               >
//                 <Trash2 size={14} /> PURGE_ACCOUNT
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Settings;












import React, { useState, useEffect } from "react";
import { ShieldCheck, Target, Bell, Save, AlertTriangle, Trash2, Zap } from "lucide-react";
import { useAuth } from "../store/authStore";
import axios from "axios";

const Settings = () => {
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
      const res = await axios.patch("http://localhost:4000/user-api/budget", budgetData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        updateUser(res.data.payload);
        alert("Financial protocols updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update budget.");
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
        { withCredentials: true }
      );

      if (res.status === 200) {
        // 4. Update global auth state with response from server
        updateUser(res.data.payload);
      }
    } catch (err) {
      // Rollback if API fails
      console.error("Sync failed:", err);
      setBudgetData((prev) => ({ ...prev, [key]: !newValue }));
      alert("Failed to sync preference with server.");
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    setSecurityLoading(true);
    try {
      await axios.put("http://localhost:4000/common-api/password", passwordData, {
        withCredentials: true,
      });
      alert("Password updated!");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed.");
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleTerminateAccount = async () => {
    const confirmFirst = window.confirm("CRITICAL: This will wipe all data. Proceed?");
    if (!confirmFirst) return;

    const passwordVerify = window.prompt("To verify, please enter your password:");

    if (passwordVerify) {
      try {
        const res = await axios.delete("http://localhost:4000/user-api/terminate", {
          data: { password: passwordVerify },
          withCredentials: true,
        });

        if (res.status === 200) {
          alert("Account purged successfully.");
          localStorage.removeItem("cashflow_user");
          window.location.href = "/login";
        }
      } catch (err) {
        alert(err.response?.data?.message || "Invalid password. Termination aborted.");
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
          SYSTEM_SETTINGS
        </h1>
        <p className="text-slate-500">Manage financial guardrails and node security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BUDGET PROTOCOLS */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Target size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Protocol Limits</h2>
          </div>

          <form onSubmit={handleUpdateBudget} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Monthly Budget Limit
              </label>
              <input
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={budgetData.monthlyBudget}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, monthlyBudget: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Min Savings Floor
              </label>
              <input
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={budgetData.minSavings}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, minSavings: Number(e.target.value) })
                }
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-slate-950 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} /> {loading ? "Syncing..." : "Update Guardrails"}
            </button>
          </form>
        </div>

        {/* SIGNAL PREFERENCES */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Alert Prefs</h2>
          </div>

          <div className="space-y-4">
            {/* Savings Toggle */}
            <div
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
              onClick={() => handleTogglePreference("savingsAlertEnabled")}
            >
              <div>
                <p className="text-sm font-medium text-slate-700">Savings Floor Warning</p>
                <p className="text-[10px] text-slate-400">Alerts when below floor limit.</p>
              </div>
              <div
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                  budgetData.savingsAlertEnabled ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    budgetData.savingsAlertEnabled ? "left-6" : "left-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Budget Limit Toggle */}
            <div
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
              onClick={() => handleTogglePreference("budgetAlertEnabled")}
            >
              <div className="flex items-center gap-3">
                <Zap
                  size={16}
                  className={`${
                    budgetData.budgetAlertEnabled ? "text-amber-500" : "text-slate-400"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-slate-700">Budget Limit Breach</p>
                  <p className="text-[10px] text-slate-400">Notify when spending exceeds limit.</p>
                </div>
              </div>
              <div
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                  budgetData.budgetAlertEnabled ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    budgetData.budgetAlertEnabled ? "left-6" : "left-1"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY & DANGER ZONE */}
        <div className="md:col-span-2 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-400" size={24} />
            <h2 className="text-xl font-semibold font-mono tracking-tight">SECURITY_VAULT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form onSubmit={handleUpdateSecurity} className="space-y-4 border-r border-white/10 pr-0 md:pr-10">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Current Key
                </label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  New Key
                </label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                />
              </div>
              <button
                disabled={securityLoading}
                className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all"
              >
                {securityLoading ? "Processing..." : "Sync New Credentials"}
              </button>
            </form>

            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <div className="p-4 bg-red-500/10 rounded-3xl border border-red-500/20">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-400">
                  Node Termination
                </p>
                <p className="text-xs text-slate-400 mt-1">Requires password verification.</p>
              </div>
              <button
                onClick={handleTerminateAccount}
                className="flex items-center gap-2 text-red-500 text-[11px] font-bold border border-red-500/30 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 size={14} /> PURGE_ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;