// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Loader2, LockKeyhole } from "lucide-react";

// function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { login, isAuthenticated, error, loading } = useAuth();
//   const navigate = useNavigate();

//   // 🔥 Clean redirect logic
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const onUserLogin = async (data) => {
//     await login(data);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full px-4 bg-black">
//       <div className="w-full max-w-[450px] bg-[#050505] border border-[#1A1A1A] rounded-[48px] p-12 shadow-2xl">
        
//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-2 mb-2">
//             <LockKeyhole className="text-white" size={20} />
//             <h2 className="text-white text-3xl font-black tracking-[-2px] uppercase">Login_System</h2>
//           </div>
//           <p className="text-[#444] text-[10px] tracking-[4px] uppercase font-bold">Authentication_Required</p>
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <div className="bg-red-950/10 border border-red-900/50 text-red-500 text-[10px] p-4 rounded-2xl mb-6 tracking-widest text-center animate-pulse">
//             ERROR // {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onUserLogin)} className="space-y-8">
//           {/* Email Field */}
//           <div className="relative group">
//             <input
//               {...register("email", { required: "Email is required" })}
//               className="w-full bg-transparent border-b border-[#222] pb-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="NETWORK_EMAIL"
//               type="email"
//             />
//             {errors.email && <p className="text-red-500 text-[8px] mt-1 uppercase">{errors.email.message}</p>}
//           </div>

//           {/* Password Field */}
//           <div className="relative group">
//             <input
//               {...register("password", { required: "Password is required" })}
//               className="w-full bg-transparent border-b border-[#222] pb-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="SECURITY_KEY"
//               type="password"
//             />
//             {errors.password && <p className="text-red-500 text-[8px] mt-1 uppercase">{errors.password.message}</p>}
//           </div>

//           {/* Action Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-white text-black font-black py-5 rounded-full mt-4 hover:bg-[#ececec] transition-all tracking-[6px] text-[11px] flex items-center justify-center gap-3"
//           >
//             {loading ? <Loader2 className="animate-spin" size={18} /> : "ACCESS_DASHBOARD"}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-10 text-center">
//           <p className="text-[#333] text-[9px] tracking-[3px] uppercase font-bold">
//             NO_ACCOUNT? 
//             <NavLink to="/register" className="text-white ml-2 hover:underline underline-offset-4 decoration-[#444]">
//               CREATE_IDENTIFIER
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, ShieldCheck } from "lucide-react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onUserLogin = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-[480px] transition-all duration-700 ease-in-out">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 mb-6 shadow-xl shadow-slate-200">
          <ShieldCheck className="text-white" size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-slate-900 text-4xl font-semibold tracking-tight mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide">Enter your credentials to access the node</p>
      </div>

      {/* Error Alert - Sophisticated Minimalist Style */}
      {error && (
        <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs py-3 px-4 rounded-xl mb-8 text-center font-medium animate-in fade-in slide-in-from-top-2">
          Authentication Failed: {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onUserLogin)} className="space-y-6">
        
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">Network Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="name@ghost.network"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-[10px] font-medium mt-1 ml-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500">Security Key</label>
            <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider">Forgot?</button>
          </div>
          <input
            {...register("password", { required: "Password is required" })}
            className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="••••••••"
            type="password"
          />
          {errors.password && <p className="text-red-500 text-[10px] font-medium mt-1 ml-1">{errors.password.message}</p>}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-950 text-white font-semibold py-4 rounded-2xl mt-4 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <span className="tracking-wide text-sm">Sign In to Dashboard</span>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-[13px] font-medium">
          New to the network? 
          <NavLink to="/register" className="text-slate-900 ml-2 font-bold hover:underline underline-offset-4 decoration-slate-200">
            Create an Identifier
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;