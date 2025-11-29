"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
}

export default function NewsletterSignup({
  title = "Stay Updated",
  description = "Get the latest World Cup news, match updates, and exclusive content delivered to your inbox.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* World Cup Icon */}
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚽</span>
        </div>

        {/* Content */}
        <h2 className="text-4xl font-black mb-4">{title}</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {description}
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to the Team!</h3>
            <p className="text-blue-100">
              Thank you for subscribing. You'll receive your first update
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 font-semibold"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </div>
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </div>

            <p className="text-sm text-blue-200 mt-4">
              ✨ Join 250,000+ football fans. No spam, unsubscribe anytime.
            </p>
          </form>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span>⚡</span>
            </div>
            <span className="font-semibold">Breaking News</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span>🎥</span>
            </div>
            <span className="font-semibold">Exclusive Content</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span>📊</span>
            </div>
            <span className="font-semibold">Match Analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
