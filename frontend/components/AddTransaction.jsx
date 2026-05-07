import React, { useState } from "react";
import { X, Sparkles, CreditCard, ChevronDown } from "lucide-react";
import { useAuth } from "../store/authStore";
import axios from "axios";

const AddTransaction = ({ isOpen, onClose, onRefresh }) => {
  // Store se currentUser aur updateUser function nikalo
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "EXPENSE",
    amount: "",
    category: "OTHERS",
    description: "",
  });

  if (!isOpen) return null;

  const categories = ["FOOD", "TRANSPORT", "RENT", "SHOPPING", "SALARY", "ENTERTAINMENT", "HEALTH", "OTHERS"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const transactionData = {
        userId: currentUser?._id,
        title: formData.title.trim(),
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        description: formData.description.trim(),
        date: new Date()
      };

      const res = await axios.post("http://localhost:4000/expense-api/expense", transactionData, {
        withCredentials: true
      });
      
      // Success check
      if (res.status === 200 || res.status === 201) {
        
        // 🔥 MAGIC HAPPENS HERE: 
        // Backend se aaya naya 'user' data store aur localStorage dono ko update karega
        if (res.data.user) {
          updateUser(res.data.user); 
        }

        // Refresh existing list (table) and close modal
        onRefresh(); 
        onClose();   
        
        // Reset form for next entry
        setFormData({ title: "", type: "EXPENSE", amount: "", category: "OTHERS", description: "" });
      }
    } catch (err) {
      console.error("Backend Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-500 border border-slate-100">
        
        {/* Sparkle Icon Overlay */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
          <Sparkles className="text-white" size={20} />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full">
          <X size={20} />
        </button>

        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">New Entry</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[2px]">Node: {currentUser?.username || "Active Session"}</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Label/Title */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Label</label>
            <input 
              required
              type="text" 
              placeholder="Where did the money go?"
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-slate-50 focus:border-slate-400 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Flow Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Flow Type</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-slate-50 outline-none cursor-pointer"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="EXPENSE">Expense</option>
                  <option value="INCOME">Income</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Amount (₹)</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-slate-50 outline-none"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Category</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-slate-50 outline-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Narrative (Optional)</label>
            <textarea 
              maxLength={200}
              placeholder="Add a brief note..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-slate-50 outline-none resize-none h-24"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-slate-950 text-white py-5 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Syncing...
              </span>
            ) : (
              <>
                <CreditCard size={18} />
                Confirm Transaction
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;