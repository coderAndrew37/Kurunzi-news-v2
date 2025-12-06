import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Something went wrong");
      setIsSubmitting(false);
    }
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    if (!isLoaded) {
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp?.status !== "complete") {
        throw new Error("Sign up could not be completed.");
      }

      if (completeSignUp?.status === "complete") {
        toast.success("Email verified successfully!");
        await setActive({ session: completeSignUp.createdSessionId! });
        router.push("/writer/dashboard");
        return;
      }

      if (!completeSignUp.createdSessionId) {
        throw new Error("No session created.");
      }

      await setActive({ session: completeSignUp.createdSessionId });
      toast.success("Sign up successful!");
      router.push("/writer/dashboard");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Something went wrong");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {!pendingVerification ? (
        <form onSubmit={submit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <Input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
            <div className="mt-2">
              <input
                aria-label="Show password"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              <label className="ml-2 text-sm">Show Password</label>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/writer/sign-in" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block mb-1 font-medium">Verification Code</label>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
