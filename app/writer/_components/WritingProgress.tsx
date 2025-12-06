"use client";

import { Target, TrendingUp, Award, Clock } from "lucide-react";

interface WritingProgressProps {
  wordCount: number;
  targetWords?: number;
  timeSpent?: number; // in minutes
}

export default function WritingProgress({
  wordCount,
  targetWords = 1000,
  timeSpent = 0,
}: WritingProgressProps) {
  const progress = Math.min((wordCount / targetWords) * 100, 100);
  const wordsPerMinute = timeSpent > 0 ? Math.round(wordCount / timeSpent) : 0;

  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getMotivationMessage = () => {
    if (wordCount < 100)
      return "Start writing! Every story begins with a single word.";
    if (wordCount < 300) return "Keep going! You're building momentum.";
    if (wordCount < 500) return "Great progress! Halfway to a solid article.";
    if (wordCount < 800) return "Almost there! Your article is taking shape.";
    return "Excellent work! You have a substantial article.";
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Writing Progress
          </h3>
          <p className="text-sm text-gray-600">{getMotivationMessage()}</p>
        </div>
        <Target className="h-8 w-8 text-blue-600" />
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{wordCount.toLocaleString()} words</span>
          <span>{targetWords.toLocaleString()} target</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% complete
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Speed</span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">
            {wordsPerMinute}
            <span className="text-sm text-gray-600 ml-1">wpm</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Time</span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">
            {timeSpent}
            <span className="text-sm text-gray-600 ml-1">min</span>
          </div>
        </div>

        {progress >= 100 && (
          <div className="col-span-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-center">
            <Award className="h-6 w-6 text-white mx-auto mb-2" />
            <p className="text-white font-medium">
              Target achieved! Ready to submit?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
