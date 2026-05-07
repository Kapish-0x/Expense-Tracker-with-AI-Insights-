import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  // 1. Initial State: Pehle check karo local storage mein user hai ya nahi
  currentUser: JSON.parse(localStorage.getItem("cashflow_user")) || null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("cashflow_user"),
  error: null,

  // 2. LOGIN: User ko login karana aur storage mein save karna
  login: async (userCred) => {
    try {
      set({ loading: true, error: null });
      let res = await axios.post(
        "http://localhost:4000/common-api/login",
        userCred,
        { withCredentials: true }
      );

      if (res.status === 200) {
        const userData = res.data?.payload;
        // Local storage mein save karo taaki refresh par logout na ho
        localStorage.setItem("cashflow_user", JSON.stringify(userData));
        
        set({
          currentUser: userData,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  // 3. UPDATE USER: Bina refresh kiye stats badalne ke liye
  // Jab transaction add ho jaye, toh backend se aaya naya 'user' yahan pass karo
  updateUser: (updatedUserData) => {
    localStorage.setItem("cashflow_user", JSON.stringify(updatedUserData));
    set({ currentUser: updatedUserData });
  },

  // 4. LOGOUT: Storage saaf karo aur state reset karo
  logout: async () => {
    try {
      set({ loading: true });
      await axios.get("http://localhost:4000/common-api/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("cashflow_user");
      set({
        currentUser: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: "Logout failed" });
    }
  },
}));