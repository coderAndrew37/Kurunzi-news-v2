"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminSignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clerk still loading → UI safe
  if (!isLoaded) return <div>Loading...</div>;

  // -----------------------------------------
  // Step 1 — Email + password
  // -----------------------------------------
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!signIn) throw new Error("Sign-in not initialized");

      const resp = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (resp.status === "needs_first_factor") {
        setError("Invalid credentials.");
      }

      if (resp.status === "needs_second_factor") {
        setPendingVerification(true);
      }

      if (resp.status === "complete") {
        if (!setActive) throw new Error("setActive is unavailable");

        await setActive({ session: resp.createdSessionId });
        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.errors?.[0]?.longMessage || err.message || "Sign in failed."
      );
    }

    setIsSubmitting(false);
  }

  // -----------------------------------------
  // Step 2 — Verify email code
  // -----------------------------------------
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!signIn) throw new Error("Sign-in not initialized");

      const resp = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: verificationCode,
      });

      if (resp.status !== "complete") {
        setError("Invalid verification code.");
        return;
      }

      if (!setActive) throw new Error("setActive is unavailable");

      await setActive({ session: resp.createdSessionId });
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setError(
        err.errors?.[0]?.longMessage || err.message || "Verification failed."
      );
    }

    setIsSubmitting(false);
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      {!pendingVerification ? (
        <form onSubmit={handleSignIn} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">Admin Sign In</h1>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              aria-label="Email"
              type="email"
              className="w-full border rounded p-2"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              aria-label="Password"
              type="password"
              className="w-full border rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">
            Verify Your Email
          </h1>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="block mb-1 text-sm font-medium">
              Verification Code
            </label>
            <input
              aria-label="Verification Code"
              type="text"
              className="w-full border rounded p-2"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>
      )}
    </div>
  );
}
