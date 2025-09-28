import React from "react";

const NewsletterSignup = () => {
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
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe to Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
