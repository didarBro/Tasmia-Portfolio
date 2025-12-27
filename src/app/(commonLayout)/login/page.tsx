"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { TError } from "@/types/gobal";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginUser] = authApi.useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // Call the login mutation
      const res = await loginUser(userInfo).unwrap();

      // redirect path

      if (res) {
        const user = verifyToken(res?.token) as TUser; // set user in store
        const BearerToken = `Bearer ${res?.token}`;

        dispatch(setUser({ user: user, token: BearerToken })); // set token in store

        // success
        toast.success("Login Successful", { id: toastId, duration: 3000 });
        router.push("/admin-dashboard");
      }
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 3000,
        });
      } else if (err) {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex py-10 items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="floating-circle bg-purple-800 opacity-10"
          style={{
            top: "10%",
            left: "15%",
            width: "200px",
            height: "200px",
            animationDuration: "15s",
          }}
        ></div>
        <div
          className="floating-circle bg-blue-900 opacity-10"
          style={{
            top: "60%",
            left: "75%",
            width: "150px",
            height: "150px",
            animationDuration: "12s",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="floating-circle bg-indigo-900 opacity-10"
          style={{
            top: "75%",
            left: "30%",
            width: "180px",
            height: "180px",
            animationDuration: "20s",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="floating-circle bg-cyan-900 opacity-10"
          style={{
            top: "25%",
            left: "65%",
            width: "220px",
            height: "220px",
            animationDuration: "18s",
            animationDelay: "3s",
          }}
        ></div>
        <div className="grid-animation"></div>
      </div>

      {/* Login Panel */}
      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-cyan-900/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 text-center border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-gray-400">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-300"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    <HiEyeOff className="text-xl" />
                  ) : (
                    <HiEye className="text-xl" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <button
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium transition-all hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:ring-offset-1 focus:ring-offset-gray-900 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-800/40"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translatey(0px) translatex(0px);
          }
          25% {
            transform: translatey(-20px) translatex(10px);
          }
          50% {
            transform: translatey(0px) translatex(20px);
          }
          75% {
            transform: translatey(20px) translatex(10px);
          }
          100% {
            transform: translatey(0px) translatex(0px);
          }
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          animation: float 15s ease-in-out infinite;
          filter: blur(40px);
        }
      `}</style>
    </div>
  );
};

export default Login;
