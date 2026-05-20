// import React, { useState, useEffect } from "react";
// import { X, Sparkles, ChevronDown } from "lucide-react";
// import { useAuth } from "../store/authStore";
// import axios from "axios";

// const AddTransaction = ({
//   isOpen,
//   onClose,
//   onRefresh,
//   initialData,
// }) => {
//   const { currentUser, updateUser } = useAuth();

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     type: "EXPENSE",
//     amount: "",
//     category: "OTHERS",
//     description: "",
//     date: new Date().toISOString().split("T")[0],
//   });

//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         setFormData({
//           title: initialData.description || "",
//           type: initialData.type || "EXPENSE",
//           amount: initialData.amount || "",
//           category: initialData.category || "OTHERS",
//           description: initialData.description || "",
//           date: initialData.date
//             ? new Date(initialData.date)
//                 .toISOString()
//                 .split("T")[0]
//             : new Date().toISOString().split("T")[0],
//         });
//       } else {
//         setFormData({
//           title: "",
//           type: "EXPENSE",
//           amount: "",
//           category: "OTHERS",
//           description: "",
//           date: new Date().toISOString().split("T")[0],
//         });
//       }
//     }
//   }, [initialData, isOpen]);

//   if (!isOpen) return null;

//   const categories = [
//     "FOOD",
//     "TRANSPORT",
//     "RENT",
//     "SHOPPING",
//     "SALARY",
//     "ENTERTAINMENT",
//     "HEALTH",
//     "OTHERS",
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       const transactionData = {
//         userId: currentUser?._id,
//         amount: Number(formData.amount),
//         type: formData.type,
//         category: formData.category,
//         description: formData.title.trim(),
//         date: formData.date,
//       };

//       let res;

//       if (initialData?._id) {
//         res = await axios.put(
//           `http://localhost:4000/expense-api/expense/${initialData._id}`,
//           transactionData,
//           { withCredentials: true },
//         );
//       } else {
//         res = await axios.post(
//           "http://localhost:4000/expense-api/expense",
//           transactionData,
//           { withCredentials: true },
//         );
//       }

//       if (res.status === 200 || res.status === 201) {
//         if (res.data.user) {
//           updateUser(res.data.user);
//         }

//         onRefresh();
//         onClose();
//       }
//     } catch (err) {
//       console.error(
//         "Backend Error:",
//         err.response?.data || err.message,
//       );

//       alert(
//         err.response?.data?.message ||
//           "Transaction failed",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
//         onClick={onClose}
//       ></div>

//       <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
//         {/* TOP ICON */}
//         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-white">
//           <Sparkles className="text-white" size={20} />
//         </div>

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
//         >
//           <X size={20} />
//         </button>

//         {/* HEADER */}
//         <header className="mb-10 text-center">
//           <h2 className="text-3xl font-semibold text-slate-900">
//             {initialData
//               ? "Update Entry"
//               : "New Entry"}
//           </h2>

//           <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[2px] mt-2">
//             {initialData
//               ? "Modifying existing record"
//               : `User: ${currentUser?.username}`}
//           </p>
//         </header>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >
//           {/* TITLE */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
//               Label
//             </label>

//             <input
//               required
//               type="text"
//               className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-slate-400 outline-none"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   title: e.target.value,
//                 })
//               }
//             />
//           </div>

//           {/* TYPE + AMOUNT */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
//                 Flow Type
//               </label>

//               <div className="relative">
//                 <select
//                   className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
//                   value={formData.type}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       type: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="EXPENSE">
//                     Expense
//                   </option>

//                   <option value="INCOME">
//                     Income
//                   </option>
//                 </select>

//                 <ChevronDown
//                   className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={16}
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
//                 Amount (₹)
//               </label>

//               <input
//                 required
//                 type="number"
//                 className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold outline-none"
//                 value={formData.amount}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     amount: e.target.value,
//                   })
//                 }
//               />
//             </div>
//           </div>

//           {/* CATEGORY */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
//               Category
//             </label>

//             <div className="relative">
//               <select
//                 className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category: e.target.value,
//                   })
//                 }
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown
//                 className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={16}
//               />
//             </div>
//           </div>

//           {/* DATE */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
//               Transaction Date
//             </label>

//             <input
//               type="date"
//               className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   date: e.target.value,
//                 })
//               }
//             />
//           </div>

//           {/* SUBMIT */}
//           <button
//             disabled={loading}
//             type="submit"
//             className="w-full bg-slate-950 text-white py-5 rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
//           >
//             {loading
//               ? "Syncing..."
//               : initialData
//                 ? "Update Transaction"
//                 : "Confirm Transaction"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTransaction;









import React, { useState, useEffect } from "react";
import { X, Sparkles, ChevronDown } from "lucide-react";
import { useAuth } from "../store/authStore";
import { useTranslation } from "react-i18next"; // Imported useTranslation
import axios from "axios";

const AddTransaction = ({
  isOpen,
  onClose,
  onRefresh,
  initialData,
}) => {
  const { currentUser } = useAuth();
  const { t } = useTranslation(); // Initialized translation hook

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "EXPENSE",
    category: "OTHERS",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.description || "",
          type: initialData.type || "EXPENSE",
          amount: initialData.amount || "",
          category: initialData.category || "OTHERS",
          description: initialData.description || "",
          date: initialData.date
            ? new Date(initialData.date)
                .toISOString()
                .split("T")[0]
            : new Date().toISOString().split("T")[0],
        });
      } else {
        setFormData({
          title: "",
          type: "EXPENSE",
          amount: "",
          category: "OTHERS",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Static options array used to dynamically pull translations
  const categories = [
    "FOOD",
    "TRANSPORT",
    "RENT",
    "SHOPPING",
    "SALARY",
    "ENTERTAINMENT",
    "HEALTH",
    "OTHERS",
  ];

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
        date: formData.date,
      };

      let res;

      if (initialData?._id) {
        res = await axios.put(
          `http://localhost:4000/expense-api/expense/${initialData._id}`,
          transactionData,
          { withCredentials: true },
        );
      } else {
        res = await axios.post(
          "http://localhost:4000/expense-api/expense",
          transactionData,
          { withCredentials: true },
        );
      }

      if (res.status === 200 || res.status === 201) {
        onRefresh();
        onClose();
      }
    } catch (err) {
      console.error(
        "Backend Error:",
        err.response?.data || err.message,
      );

      alert(
        err.response?.data?.message ||
          t("transaction failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
        {/* TOP ICON */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-white">
          <Sparkles className="text-white" size={20} />
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            {initialData ? t("update entry") : t("new entry")}
          </h2>

          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[2px] mt-2">
            {initialData
              ? t("modifying existing record")
              : `${t("user")}: ${currentUser?.username}`}
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
              {t("label")}
            </label>

            <input
              required
              type="text"
              className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-slate-400 outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* TYPE + AMOUNT */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
                {t("flow type")}
              </label>

              <div className="relative">
                <select
                  className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="EXPENSE">{t("expense")}</option>
                  <option value="INCOME">{t("income")}</option>
                </select>

                <ChevronDown
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
                {t("amount arrow")}
              </label>

              <input
                required
                type="number"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold outline-none"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
              {t("category")}
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(cat.toLowerCase())}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>

          {/* DATE */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] ml-1">
              {t("transaction date")}
            </label>

            <input
              type="date"
              className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-slate-950 text-white py-5 rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
          >
            {loading
              ? t("syncing")
              : initialData
                ? t("update transaction btn")
                : t("confirm transaction")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;