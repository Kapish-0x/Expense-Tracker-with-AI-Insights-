import React, { useState, useEffect } from "react";
import { X, Sparkles, CreditCard, ChevronDown } from "lucide-react";
import { useAuth } from "../store/authStore";
import axios from "axios";


const AddTransaction = ({ isOpen, onClose, onRefresh, initialData }) => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "EXPENSE",
    amount: "",
    category: "OTHERS",
    description: "",
  });

  
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.description || "", // Using description as title/label
          type: initialData.type || "EXPENSE",
          amount: initialData.amount || "",
          category: initialData.category || "OTHERS",
          description: initialData.description || "",
        });
      } else {
        // Reset for new entry
        setFormData({ title: "", type: "EXPENSE", amount: "", category: "OTHERS", description: "" });
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const categories = ["FOOD", "TRANSPORT", "RENT", "SHOPPING", "SALARY", "ENTERTAINMENT", "HEALTH", "OTHERS"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const transactionData = {
        userId: currentUser?._id,
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        description: formData.title.trim(),
        date: initialData ? initialData.date : new Date() 
      };

      let res;
      if (initialData?._id) {
        
        res = await axios.put(
          `http://localhost:4000/expense-api/expense/${initialData._id}`, 
          transactionData, 
          { withCredentials: true }
        );
      } else {
        
        res = await axios.post(
          "http://localhost:4000/expense-api/expense", 
          transactionData, 
          { withCredentials: true }
        );
      }
      
      if (res.status === 200 || res.status === 201) {
        if (res.data.user) updateUser(res.data.user); 
        onRefresh(); 
        onClose();   
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
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-white">
          <Sparkles className="text-white" size={20} />
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
          <X size={20} />
        </button>

        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            {initialData ? "Update Entry" : "New Entry"}
          </h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[2px] mt-2">
            {initialData ? "Modifying existing record" : `User: ${currentUser?.username}`}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Label</label>
            <input 
              required
              type="text" 
              className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-slate-400 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Flow Type</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="EXPENSE">Expense</option>
                  <option value="INCOME">Income</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Amount (₹)</label>
              <input 
                required
                type="number" 
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold outline-none"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">Category</label>
            <div className="relative">
              <select 
                className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-slate-950 text-white py-5 rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? "Syncing..." : (initialData ? "Update Transaction" : "Confirm Transaction")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;