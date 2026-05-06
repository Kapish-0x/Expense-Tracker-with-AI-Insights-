// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Loader2, ShieldCheck } from "lucide-react";
// import { useAuth } from "../store/authStore";

// function Register() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const navigate = useNavigate();

//   const { isAuthenticated } = useAuth();

//   // 🔐 Prevent logged-in users from accessing register
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const onUserRegister = async (userObj) => {
//     setApiError(null);
//     setLoading(true);

//     const payload = {
//       name: userObj.name.trim(),
//       email: userObj.email.trim(),
//       password: userObj.password,
//       role: "USER",
//     };

//     try {
//       let res = await axios.post("http://localhost:4000/user-api/users", payload);

//       if (res.status === 201 || res.status === 200) {
//         // 🔥 clean redirect after register
//         navigate("/login");
//       }
//     } catch (err) {
//       setApiError(err.response?.data?.message || "SYSTEM_ERROR: AUTH_PORTAL_OFFLINE");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full px-4">
//       {/* Ghost Network Styled Card */}
//       <div className="w-full max-w-125 bg-[#050505] border border-[#222] shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] rounded-[48px] p-12 transition-all hover:border-[#333]">
        
//         {/* Header Section */}
//         <div className="mb-12 space-y-2">
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="text-red-600" size={24} />
//             <h2 className="text-white text-4xl font-black tracking-[-3px] uppercase">Join_Net</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="h-px w-12 bg-red-600"></span>
//             <p className="text-[#666] text-[10px] tracking-[4px] font-bold uppercase">System_Entry_v1.0</p>
//           </div>
//         </div>

//         {/* Error Notification */}
//         {apiError && (
//           <div className="bg-red-950/20 border border-red-500/50 text-red-500 text-[10px] p-4 rounded-2xl mb-8 tracking-[2px] text-center animate-pulse font-mono">
//             ERROR // {apiError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onUserRegister)} className="space-y-8">
//           {/* Name Input */}
//           <div className="group relative">
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="Name"
//             />
//             <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
//             {errors.name && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.name.message}</p>}
//           </div>

//           {/* Email Input */}
//           <div className="group relative">
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="Email"
//             />
//             <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
//             {errors.email && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.email.message}</p>}
//           </div>

//           {/* Password Input */}
//           <div className="group relative">
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="Password"
//             />
//             <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
//             {errors.password && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.password.message}</p>}
//           </div>

//           {/* Action Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-white text-black font-black py-5 rounded-full mt-4 hover:bg-red-600 hover:text-white transition-all duration-300 tracking-[6px] text-[11px] flex items-center justify-center gap-4 group"
//           >
//             {loading ? <Loader2 className="animate-spin" size={18} /> : (
//               <>
//                 INITIALIZE CORE
//                 <div className="w-2 h-2 rounded-full bg-red-600 group-hover:bg-white animate-pulse"></div>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer Link */}
//         <div className="mt-12 text-center">
//           <p className="text-[#333] text-[10px] tracking-[3px] uppercase font-bold">
//             Already authenticated? 
//             <NavLink to="/login" className="text-white hover:text-red-600 ml-3 transition-colors underline underline-offset-8 decoration-red-600/30">
//               LOGIN PORTAL
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;





import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "../store/authStore";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onUserRegister = async (userObj) => {
    setApiError(null);
    setLoading(true);

    const payload = {
      name: userObj.name.trim(),
      email: userObj.email.trim(),
      password: userObj.password,
      role: "USER",
    };

    try {
      let res = await axios.post("http://localhost:4000/user-api/users", payload);
      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Connection refused. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] transition-all duration-700 ease-in-out">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-100 mb-6 shadow-sm">
          <UserPlus className="text-slate-900" size={26} strokeWidth={1.5} />
        </div>
        <h2 className="text-slate-900 text-3xl font-semibold tracking-tight mb-2">Create Identifier</h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide">Join the decentralized node network</p>
      </div>

      {/* Error Notification */}
      {apiError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] py-3 px-4 rounded-xl mb-8 text-center font-medium animate-in fade-in slide-in-from-top-2">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onUserRegister)} className="space-y-5">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">Identity Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">Network Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="name@ghost.network"
          />
          {errors.email && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">Security Key</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.password.message}</p>}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-950 text-white font-semibold py-4 rounded-2xl mt-4 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <span className="tracking-wide text-sm">Initialize Identity</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white transition-colors"></div>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-slate-400 text-[13px] font-medium">
          Already authenticated? 
          <NavLink to="/login" className="text-slate-900 ml-2 font-bold hover:underline underline-offset-4 decoration-slate-200">
            Login Portal
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;