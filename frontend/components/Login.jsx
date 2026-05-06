import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, LockKeyhole } from "lucide-react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, currentUser, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();

  // Handle Redirection
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "USER") navigate("/user-profile");
      if (currentUser.role === "ADMIN") navigate("/admin-dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  const onUserLogin = async (data) => {
    await login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 bg-black">
      <div className="w-full max-w-[450px] bg-[#050505] border border-[#1A1A1A] rounded-[48px] p-12 shadow-2xl">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <LockKeyhole className="text-white" size={20} />
            <h2 className="text-white text-3xl font-black tracking-[-2px] uppercase">Login_System</h2>
          </div>
          <p className="text-[#444] text-[10px] tracking-[4px] uppercase font-bold">Authentication_Required</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/10 border border-red-900/50 text-red-500 text-[10px] p-4 rounded-2xl mb-6 tracking-widest text-center animate-pulse">
            ERROR // {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-8">
          {/* Email Field */}
          <div className="relative group">
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full bg-transparent border-b border-[#222] pb-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-[#222] font-mono"
              placeholder="NETWORK_EMAIL"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-[8px] mt-1 uppercase">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative group">
            <input
              {...register("password", { required: "Password is required" })}
              className="w-full bg-transparent border-b border-[#222] pb-3 text-white text-lg focus:border-white outline-none transition-all placeholder:text-[#222] font-mono"
              placeholder="SECURITY_KEY"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-[8px] mt-1 uppercase">{errors.password.message}</p>}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-full mt-4 hover:bg-[#ececec] transition-all tracking-[6px] text-[11px] flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "ACCESS_DASHBOARD"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[#333] text-[9px] tracking-[3px] uppercase font-bold">
            NO_ACCOUNT? 
            <NavLink to="/register" className="text-white ml-2 hover:underline underline-offset-4 decoration-[#444]">
              CREATE_IDENTIFIER
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;