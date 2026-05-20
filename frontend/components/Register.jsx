import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "../store/authStore";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      let res = await axios.post(
        "http://localhost:4000/user-api/users",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          t("connection refused"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-130 mx-auto min-h-screen flex flex-col justify-center px-4 transition-all duration-700 ease-in-out">
    {/* Header Section */}
    <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-100 mb-6 shadow-sm">
          <UserPlus className="text-slate-900" size={26} strokeWidth={1.5} />
        </div>

        <h2 className="text-slate-900 text-3xl font-semibold tracking-tight mb-2">
          {t("create account")}
        </h2>
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
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">
            {t("name")}
          </label>

          <input
            type="text"
            {...register("name", {
              required: t("name required"),
            })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder={t("enter name")}
          />

          {errors.name && (
            <p className="text-red-500 text-[10px] font-medium ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">
            {t("email")}
          </label>

          <input
            type="email"
            {...register("email", {
              required: t("email required"),
            })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder={t("enter email")}
          />

          {errors.email && (
            <p className="text-red-500 text-[10px] font-medium ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 ml-1">
            {t("password")}
          </label>

          <input
            type="password"
            {...register("password", {
              required: t("password required"),
            })}
            className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-slate-900 outline-none transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 placeholder:text-slate-300"
            placeholder="••••••••"
          />

          {errors.password && (
            <p className="text-red-500 text-[10px] font-medium ml-1">
              {errors.password.message}
            </p>
          )}
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
              <span className="tracking-wide text-sm">
                {t("sign up")}
              </span>

              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white transition-colors"></div>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-slate-400 text-[13px] font-medium">
          {t("already user")}

          <NavLink
            to="/login"
            className="text-slate-900 ml-2 font-bold hover:underline underline-offset-4 decoration-slate-200"
          >
            {t("login")}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;