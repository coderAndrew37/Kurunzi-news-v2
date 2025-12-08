"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";

//
// ✅ ZOD VALIDATION SCHEMAS
//
const SignUpSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const VerifySchema = z.object({
  code: z.string().min(6, "Enter the 6-digit code"),
});

export default function SignUpPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const [pendingVerification, setPendingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //
  // FORM 1: SIGN UP
  //
  const signUpForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  //
  // FORM 2: VERIFY
  //
  const verifyForm = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });

  if (!isLoaded) return <div>Loading...</div>;

  // -----------------------------
  // SUBMIT SIGN-UP
  // -----------------------------
  async function onSignUpSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      await signUp?.create({
        emailAddress: values.emailAddress,
        password: values.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification code sent");
      setPendingVerification(true);
    } catch (err: any) {
      toast.error(err.errors?.[0]?.longMessage || "Something went wrong");
    }
  }

  // -----------------------------
  // SUBMIT EMAIL VERIFICATION
  // -----------------------------
  async function onVerifySubmit(values: z.infer<typeof VerifySchema>) {
    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: values.code,
      });

      if (result?.status !== "complete") {
        throw new Error("Verification failed");
      }
      if (!setActive) {
        throw new Error("setActive is not available.");
      }

      await setActive({ session: result.createdSessionId });

      toast.success("Welcome!");

      router.push("/writer/dashboard");
    } catch (err: any) {
      toast.error(err.errors?.[0]?.longMessage || "Invalid code");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg relative overflow-hidden">
      {/* Smooth animated transitions */}
      <AnimatePresence mode="wait">
        {!pendingVerification ? (
          // ===========================================
          // ✨ SIGN UP FORM
          // ===========================================
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Create Account
            </h2>

            <form
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="font-medium">Email Address</label>
                <Input
                  type="email"
                  {...signUpForm.register("emailAddress")}
                  className="mt-1"
                  placeholder="you@example.com"
                />
                {signUpForm.formState.errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {signUpForm.formState.errors.emailAddress.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="font-medium">Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...signUpForm.register("password")}
                  className="mt-1"
                  placeholder="••••••••"
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
                <div className="mt-2">
                  <label className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    Show password
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={signUpForm.formState.isSubmitting}
              >
                {signUpForm.formState.isSubmitting
                  ? "Creating..."
                  : "Create Account"}
              </Button>

              <p className="text-sm text-center mt-3">
                Already registered?{" "}
                <Link
                  href="/writer/sign-in"
                  className="text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </motion.div>
        ) : (
          // ===========================================
          // ✨ EMAIL VERIFICATION FORM
          // ===========================================
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Verify Email
            </h2>

            <form
              onSubmit={verifyForm.handleSubmit(onVerifySubmit)}
              className="space-y-5"
            >
              <div>
                <label className="font-medium">Verification Code</label>
                <Input
                  type="text"
                  {...verifyForm.register("code")}
                  className="mt-1 tracking-widest text-center"
                  placeholder="123456"
                />
                {verifyForm.formState.errors.code && (
                  <p className="text-red-500 text-sm mt-1">
                    {verifyForm.formState.errors.code.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={verifyForm.formState.isSubmitting}
              >
                {verifyForm.formState.isSubmitting
                  ? "Verifying..."
                  : "Verify Email"}
              </Button>

              <p className="text-sm text-center mt-3 text-gray-500">
                Didn’t receive a code? Check spam or wait 1 minute.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
