import React from "react";

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  return (
    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">
        Share this story:
      </span>
      <ShareButtons title={title} url={url} />
    </div>
  );
};

export default ShareButtons;
