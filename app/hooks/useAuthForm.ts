import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export const useAuthForm = (userType: "admin" | "writer") => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter(); // ✅ Moved to top-level
  const supabase = createBrowserSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    clearErrors();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("root", {
            type: "manual",
            message: "Invalid email or password. Please try again.",
          });
        } else {
          setServerError(error.message);
        }
        return;
      }

      const redirectPath =
        userType === "admin" ? "/admin" : "/writer/dashboard";

      router.push(redirectPath); // ✅ Works now
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading: isLoading || isSubmitting,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(!showPassword),
    serverError,
    reset,
    clearErrors,
    userType,
  };
};
