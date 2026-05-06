import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  login: async (userCred) => {
    try {
      set({ loading: true, error: null });

      let res = await axios.post(
        "http://localhost:4000/common-api/login",
        userCred
      );

      if (res.status === 200) {
        set({
          currentUser: res.data?.payload,
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

  logout: async () => {
    try {
      set({ loading: true });

      await axios.get("http://localhost:4000/common-api/logout");

      set({
        currentUser: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: "Logout failed",
      });
    }
  },
}));