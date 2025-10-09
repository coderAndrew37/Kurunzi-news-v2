"use client";
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Informed with Breaking News
          </h3>
          <p className="text-blue-100 mb-6">
            Get instant alerts on major developments as they happen
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe to Alerts"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-blue-100">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
