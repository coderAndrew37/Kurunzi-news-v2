"use client";

interface Props {
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  showComments: boolean;
  setShowComments: (value: boolean) => void;
}

export default function ArticleActions({
  isBookmarked,
  setIsBookmarked,
  showComments,
  setShowComments,
}: Props) {
  return (
    <div className="flex items-center justify-between py-6 border-t border-neutral-200">
      <div className="flex space-x-4">
        {/* Save */}
        <button
          className="flex items-center text-neutral-600 hover:text-blue-600"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? (
            <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24">
              <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.757.429L12 18.03l-7.243 4.543A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
          <span className="ml-1">Save</span>
        </button>

        {/* Share */}
        <button className="flex items-center text-neutral-600 hover:text-blue-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="ml-1">Share</span>
        </button>

        {/* Comments Toggle */}
        <button
          className="flex items-center text-neutral-600 hover:text-blue-600"
          onClick={() => setShowComments(!showComments)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="ml-1">Comments</span>
        </button>
      </div>
    </div>
  );
}
