import { Button } from "@radix-ui/themes";
import React from "react";

const WorldCupNewsletterSignup = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/world-cup-pattern.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            Never Miss a World Cup Moment
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-red-100">
            Sign up for exclusive updates, ticket information, and
            behind-the-scenes content for the 2026 FIFA World Cup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-red-300 bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-red-200 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorldCupNewsletterSignup;
