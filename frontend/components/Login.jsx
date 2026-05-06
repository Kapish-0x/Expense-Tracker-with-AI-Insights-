import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, ShieldCheck } from "lucide-react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Added 'checkAuth' from store
  const { login, isAuthenticated, error, loading, checkAuth } = useAuth();
  const navigate = useNavigate();

  // 1. Cookie-based Persistence Check
  // Agar page refresh ho aur user ke paas valid cookie ho, toh ye usey login hi rakhega
  useEffect(() => {
    const initAuth = async () => {
      if (checkAuth) {
        await checkAuth();
      }
    };
    initAuth();
  }, [checkAuth]);

  // 2. Redirect Logic
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onUserLogin = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-120 transition-all duration-700 ease-in-out">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 mb-6 shadow-xl shadow-slate-200">
          <ShieldCheck className="text-white" size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-slate-900 text-4xl font-semibold tracking-tight mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide">Enter your credentials to access the node</p>
      </div>

      {/* Error Alert */}
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