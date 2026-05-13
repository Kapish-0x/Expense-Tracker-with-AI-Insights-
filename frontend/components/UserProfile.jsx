import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { startTour } from "../src/utils/tour";

const UserProfile = () => {
  const { currentUser, logout, updateUser } = useAuth();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(
    currentUser?.name || currentUser?.username || "",
  );

  // Logout
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Save Updated Profile
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4000/user-api/update-profile",
        {
          name,
        },
        {
          withCredentials: true,
        },
      );

      // UPDATE STORE + LOCAL STORAGE
      updateUser(res.data.payload);

      alert("Profile updated");

      setIsEditing(false);
    } catch (err) {
      console.log(err);

      alert("Failed to update profile");
    }
  };

  // Delete All Transactions
  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove all transactions?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:4000/expense-api/delete-all", {
        withCredentials: true,
      });

      alert("All transactions removed");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert("Failed to remove transactions");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2rem] border border-slate-100 shadow-sm p-8">
        {/* PROFILE */}
        <div className="flex flex-col items-center">
          {/* AVATAR */}
          <div className="w-24 h-24 rounded-3xl bg-slate-950 flex items-center justify-center text-white text-2xl font-bold uppercase">
            {(currentUser?.name || currentUser?.username || "G").slice(0, 2)}
          </div>

          {/* USER NAME */}
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-5 border border-slate-200 rounded-2xl px-4 py-3 w-full outline-none"
            />
          ) : (
            <h1 className="text-2xl font-bold text-slate-900 mt-5">
              {currentUser?.name || currentUser?.username || "Guest User"}
            </h1>
          )}

          {/* EMAIL */}
          <p className="text-slate-400 text-sm mt-2">
            {currentUser?.email || "No Email"}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-4">
          {/* EDIT + REMOVE SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-4">
            {/* EDIT PROFILE */}
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold hover:bg-emerald-600 transition-all"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-slate-950 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all"
              >
                Edit Profile
              </button>
            )}

            {/* REMOVE ALL TRANSACTIONS */}
            <button
              onClick={handleDeleteAll}
              className="w-full bg-rose-500 text-white py-4 rounded-2xl font-semibold hover:bg-rose-600 transition-all"
            >
              Clear Transactions
            </button>
          </div>

          <button
            onClick={() => startTour(navigate)}
            className="w-full bg-slate-950 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all"
          >
            Restart App Tour
          </button>
          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full border border-slate-200 py-4 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
