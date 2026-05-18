// import { create } from "zustand";
// import axios from "axios";

// export const useAuth = create((set) => ({
//   currentUser: JSON.parse(localStorage.getItem("cashflow_user")) || null,
//   loading: false,
//   isAuthenticated: !!localStorage.getItem("cashflow_user"),
//   error: null,

//   login: async (userCred) => {
//     try {
//       set({ loading: true, error: null });
//       let res = await axios.post(
//         "http://localhost:4000/common-api/login",
//         userCred,
//         { withCredentials: true },
//       );

//       if (res.status === 200) {
//         const userData = res.data?.payload;
//         // LocalStorage mein save karo
//         localStorage.setItem("cashflow_user", JSON.stringify(userData));

//         set({
//           currentUser: userData,
//           isAuthenticated: true,
//           loading: false,
//           error: null,
//         });
//       }
//     } catch (err) {
//       set({
//         loading: false,
//         isAuthenticated: false,
//         currentUser: null,
//         error: err.response?.data?.message || "Login failed",
//       });
//     }
//   },

//   // 🔥 YE WALA MISSING THA - ISSE ERROR THEEK HO JAYEGA
//   updateUser: (updatedUserData) => {
//     localStorage.setItem("cashflow_user", JSON.stringify(updatedUserData));
//     set({ currentUser: updatedUserData });
//   },

//   logout: async () => {
//     try {
//       set({ loading: true });
//       await axios.get("http://localhost:4000/common-api/logout", {
//         withCredentials: true,
//       });

//       // Storage saaf karo
//       localStorage.removeItem("cashflow_user");
//       set({
//         currentUser: null,
//         isAuthenticated: false,
//         error: null,
//         loading: false,
//       });
//     } catch (err) {
//       set({ loading: false, error: "Logout failed" });
//     }
//   },
// }));
import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("cashflow_user")) || null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("cashflow_user"),
  error: null,

  login: async (userCred) => {
    try {
      set({ loading: true, error: null });
      let res = await axios.post(
        "http://localhost:4000/common-api/login",
        userCred,
        { withCredentials: true },
      );

      if (res.status === 200) {
        const userData = res.data?.payload;
        // LocalStorage mein save karo
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

  // 🔥 YE WALA MISSING THA - ISSE ERROR THEEK HO JAYEGA
  updateUser: (updatedUserData) => {
    localStorage.setItem("cashflow_user", JSON.stringify(updatedUserData));
    set({ currentUser: updatedUserData });
  },

  logout: async () => {
    try {
      set({ loading: true });
      await axios.get("http://localhost:4000/common-api/logout", {
        withCredentials: true,
      });

      // Storage saaf karo
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