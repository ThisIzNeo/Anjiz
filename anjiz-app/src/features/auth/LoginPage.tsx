/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { loginSchema, type LoginFormData } from "./schemas/loginSchema";
import { toast } from "react-toastify";
import loginBg from "../../../public/loginWallpaper.png"; 
import "../../App.css";

export const LoginPage = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null);
      await login(data.email, data.password);
      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md bg-white/10 backdrop-blur-md shadow-2xl p-10 border border-white/20 rounded-xl"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight">
          Sign In
        </h2>

        {authError && (
          <div
            role="alert"
            className="alert alert-error mb-6 text-sm bg-red-600/90 text-white rounded-lg p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{authError}</span>
          </div>
        )}

        <div className="form-control w-full mb-5">
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className={`input input-bordered w-full bg-white/20 text-white placeholder:text-gray-200 border-white/20 focus:border-white focus:bg-white/30 ${errors.email ? "input-error border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-300 text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control w-full mb-8">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`input input-bordered w-full bg-white/20 text-white placeholder:text-gray-200 border-white/20 focus:border-white focus:bg-white/30 ${errors.password ? "input-error border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-300 text-xs mt-1.5">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full text-lg font-semibold bg-blue-600 border-none hover:bg-blue-700 transition duration-300 ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};