// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Image as ImageIcon, Loader2, ShieldCheck } from "lucide-react";

// function Register() {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const navigate = useNavigate();
//   const profileImage = watch("profileImageUrl");

//   const onUserRegister = async (userObj) => {
//     setApiError(null);
//     const formData = new FormData();
//     formData.append("name", userObj.name);
//     formData.append("email", userObj.email);
//     formData.append("password", userObj.password);
//     if (userObj.profileImageUrl?.[0]) {
//       formData.append("profileImageUrl", userObj.profileImageUrl[0]);
//     }

//     try {
//       setLoading(true);
//       let res = await axios.post("http://localhost:4000/user-api/users", formData);
//       if (res.status === 201) navigate("/login");
//     } catch (err) {
//       setApiError(err.response?.data?.message || "SYSTEM_ERROR: REGISTRATION_FAILED");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full px-4">
//       {/* Wide Card with Border Glow */}
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

//         {apiError && (
//           <div className="bg-red-950/20 border border-red-500/50 text-red-500 text-[10px] p-4 rounded-2xl mb-8 tracking-[2px] text-center animate-pulse">
//             ERROR // {apiError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onUserRegister)} className="space-y-8">
//           {/* Inputs with high contrast bottom border */}
//           <div className="group relative">
//             <input
//               type="text"
//               {...register("name", { required: true })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="IDENTIFIER_NAME"
//             />
//             <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
//           </div>

//           <div className="group relative">
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="NETWORK_EMAIL"
//             />
//           </div>

//           <div className="group relative">
//             <input
//               type="password"
//               {...register("password", { required: true })}
//               className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
//               placeholder="SECURITY_KEY"
//             />
//           </div>

//           {/* Stylized File Upload */}
//           <label className="flex items-center justify-between bg-[#0a0a0a] border border-[#1a1a1a] p-5 rounded-3xl cursor-pointer hover:bg-[#111] transition-all border-dashed">
//             <div className="flex flex-col">
//               <span className="text-[#444] text-[9px] tracking-widest uppercase mb-1">Avatar_Source</span>
//               <span className="text-white text-xs truncate max-w-50">
//                 {profileImage?.[0] ? profileImage[0].name : "NO_FILE_SELECTED"}
//               </span>
//             </div>
//             <ImageIcon size={20} className="text-red-600" />
//             <input type="file" {...register("profileImageUrl")} className="hidden" />
//           </label>

//           {/* Submit Button with Hover Effect */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-white text-black font-black py-5 rounded-full mt-4 hover:bg-red-600 hover:text-white transition-all duration-300 tracking-[6px] text-[11px] flex items-center justify-center gap-4 group"
//           >
//             {loading ? <Loader2 className="animate-spin" size={18} /> : (
//               <>
//                 INITIALIZE_CORE
//                 <div className="w-2 h-2 rounded-full bg-red-600 group-hover:bg-white animate-pulse"></div>
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-12 text-center">
//           <p className="text-[#333] text-[10px] tracking-[3px] uppercase font-bold">
//             Already authenticated? 
//             <NavLink to="/login" className="text-white hover:text-red-600 ml-3 transition-colors underline underline-offset-8 decoration-red-600/30">
//               LOGIN_PORTAL
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;










import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const onUserRegister = async (userObj) => {
    setApiError(null);
    setLoading(true);

    // Final Payload: role: "user" added to bypass backend validation
    const payload = {
      name: userObj.name.trim(),
      email: userObj.email.trim(),
      password: userObj.password,
      role: "USER", 
    };
    console.log("Payload being sent to Backend:", payload);
    try {
      // Sending high-contrast JSON request
      let res = await axios.post("http://localhost:4000/user-api/users", payload);

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Auth Error Trace:", err.response?.data);
      // Backend error message handle
      setApiError(err.response?.data?.message || "SYSTEM_ERROR: AUTH_PORTAL_OFFLINE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      {/* Ghost Network Styled Card */}
      <div className="w-full max-w-125 bg-[#050505] border border-[#222] shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] rounded-[48px] p-12 transition-all hover:border-[#333]">
        
        {/* Header Section */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-red-600" size={24} />
            <h2 className="text-white text-4xl font-black tracking-[-3px] uppercase">Join_Net</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-red-600"></span>
            <p className="text-[#666] text-[10px] tracking-[4px] font-bold uppercase">System_Entry_v1.0</p>
          </div>
        </div>

        {/* Error Notification */}
        {apiError && (
          <div className="bg-red-950/20 border border-red-500/50 text-red-500 text-[10px] p-4 rounded-2xl mb-8 tracking-[2px] text-center animate-pulse font-mono">
            ERROR // {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserRegister)} className="space-y-8">
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
              placeholder="Name"
            />
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
            {errors.name && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div className="group relative">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
              placeholder="Email"
            />
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
            {errors.email && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="group relative">
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full bg-transparent border-b-2 border-[#1a1a1a] pb-2 text-white text-lg focus:border-red-600 outline-none transition-all placeholder:text-[#222] font-mono"
              placeholder="Password"
            />
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all group-focus-within:w-full"></span>
            {errors.password && <p className="text-red-600 text-[8px] mt-1 uppercase tracking-widest">{errors.password.message}</p>}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-full mt-4 hover:bg-red-600 hover:text-white transition-all duration-300 tracking-[6px] text-[11px] flex items-center justify-center gap-4 group"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                INITIALIZE CORE
                <div className="w-2 h-2 rounded-full bg-red-600 group-hover:bg-white animate-pulse"></div>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <p className="text-[#333] text-[10px] tracking-[3px] uppercase font-bold">
            Already authenticated? 
            <NavLink to="/login" className="text-white hover:text-red-600 ml-3 transition-colors underline underline-offset-8 decoration-red-600/30">
              LOGIN PORTAL
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;