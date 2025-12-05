"use client";

import { useEffect, useState } from "react";

interface InlineAdProps {
  type?: "banner" | "square" | "skyscraper";
  position?: number;
  label?: string;
}

export default function InlineAd({
  type = "banner",
  position = 0,
  label = "Advertisement",
}: InlineAdProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const adDimensions = {
    banner: "h-[90px] w-full",
    square: "h-[250px] w-[250px]",
    skyscraper: "h-[600px] w-[160px]",
  };

  return (
    <div
      className={`my-12 flex justify-center ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
    >
      <div
        className={`${adDimensions[type]} bg-gray-100 rounded-lg flex flex-col items-center justify-center border border-gray-200`}
      >
        <div className="text-center">
          <p className="text-gray-400 text-xs font-medium mb-1">{label}</p>
          <p className="text-gray-500 text-xs">
            {type === "banner" && "728x90"}
            {type === "square" && "250x250"}
            {type === "skyscraper" && "160x600"}
          </p>
          <p className="text-gray-600 text-sm mt-2">Your ad could be here</p>
        </div>
      </div>
    </div>
  );
}
