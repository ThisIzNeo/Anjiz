import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { loginSchema, type LoginFormData } from "./schemas/loginSchema";
import { toast } from "react-toastify";
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
    <div className="flex h-screen items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-96 bg-base-100 shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {authError && (
          <div
            role="alert"
            className="alert alert-error mb-4 text-sm text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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

        <div className="form-control w-full mb-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control w-full mb-6">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && (
            <p className="text-error text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
