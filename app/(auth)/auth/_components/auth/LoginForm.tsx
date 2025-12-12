"use client";

import { Eye, EyeOff, Mail, Lock, Shield, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuthForm } from "@/app/hooks/useAuthForm";
import Link from "next/link";

interface LoginFormProps {
  userType: "admin" | "writer";
  className?: string;
}

export default function LoginForm({ userType, className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    serverError,
    clearErrors, // <-- use the hook's clearErrors
  } = useAuthForm(userType);

  const userConfig = {
    admin: {
      title: "Admin Portal",
      subtitle: "Access your administration dashboard",
      icon: Shield,
      gradientFrom: "from-blue-600",
      gradientTo: "to-indigo-600",
    },
    writer: {
      title: "Writer Portal",
      subtitle: "Sign in to access your writing dashboard",
      icon: PenTool,
      gradientFrom: "from-purple-600",
      gradientTo: "to-pink-600",
    },
  }[userType];

  const IconComponent = userConfig.icon;

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4",
        className
      )}
    >
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Gradient Header */}
          <div
            className={cn(
              "bg-gradient-to-r p-8 text-center",
              userConfig.gradientFrom,
              userConfig.gradientTo
            )}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {userConfig.title}
            </h1>
            <p className="text-blue-100 opacity-90">{userConfig.subtitle}</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {serverError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {serverError}
                </p>
              </div>
            )}

            {errors.root && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {errors.root.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                icon={<Mail className="w-5 h-5" />}
                {...register("email")}
                disabled={isLoading}
                onFocus={() => clearErrors("email")}
              />

              <div className="space-y-2 relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  icon={<Lock className="w-5 h-5" />}
                  {...register("password")}
                  disabled={isLoading}
                  onFocus={() => clearErrors("password")}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    {...register("rememberMe")}
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>

                <Link
                  href={`/auth/${userType}/forgot-password`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                fullWidth
                className="mt-2"
              >
                Sign In
              </Button>

              {process.env.NODE_ENV === "development" && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Demo: test@example.com / password123
                  </p>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Need help?{" "}
                <Link
                  href={`/contact?role=${userType}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          © {new Date().getFullYear()} Kurunzi News. All rights reserved.
        </p>
      </div>
    </div>
  );
}
