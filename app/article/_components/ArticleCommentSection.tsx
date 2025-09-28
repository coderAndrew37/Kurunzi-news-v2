"use client";

import Image from "next/image";

export default function CommentsSection() {
  return (
    <div className="pt-6 border-t border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Comments (12)
      </h3>
      <div className="space-y-4">
        {/* Comment form */}
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-neutral-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.67 0 8.85 2.343 11.996 5.993zM16 10a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <form>
              <textarea
                className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Join the discussion..."
              ></textarea>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sample comment */}
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-neutral-900">Michael Chen</h4>
                <span className="text-xs text-neutral-500">2 hours ago</span>
              </div>
              <p className="text-neutral-700">
                This is a critical issue that needs immediate attention.
                I&apos;m glad world leaders are finally taking it seriously.
              </p>
              <div className="mt-2 flex items-center space-x-3">
                <button className="text-sm text-neutral-600 hover:text-blue-600">
                  Like
                </button>
                <button className="text-sm text-neutral-600 hover:text-blue-600">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
