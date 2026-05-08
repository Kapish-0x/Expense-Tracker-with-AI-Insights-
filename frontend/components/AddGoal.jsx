import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import axios from "axios";

const AddGoal = ({ isOpen, onClose, onRefresh, initialData }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          targetAmount: initialData.targetAmount || "",
          deadline: initialData.deadline
            ? new Date(initialData.deadline).toISOString().split("T")[0]
            : "",
          description: initialData.description || "",
        });
      } else {
        setFormData({
          title: "",
          targetAmount: "",
          deadline: "",
          description: "",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        targetAmount: Number(formData.targetAmount),
        deadline: formData.deadline || null,
        description: formData.description,
      };

      if (initialData?._id) {
        await axios.put(
          `http://localhost:4000/expense-api/goal/${initialData._id}`,
          payload,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:4000/expense-api/goal",
          payload,
          { withCredentials: true }
        );
      }

      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Goal save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-white">
          <Sparkles className="text-white" size={20} />
        </div>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            {initialData ? "Update Goal" : "New Goal"}
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            required
            placeholder="Goal title"
            className="w-full border border-slate-200 rounded-2xl px-5 py-4"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            required
            type="number"
            placeholder="Target amount"
            className="w-full border border-slate-200 rounded-2xl px-5 py-4"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({ ...formData, targetAmount: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full border border-slate-200 rounded-2xl px-5 py-4"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border border-slate-200 rounded-2xl px-5 py-4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-slate-950 text-white py-5 rounded-2xl font-semibold"
          >
            {loading ? "Saving..." : "Save Goal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoal;