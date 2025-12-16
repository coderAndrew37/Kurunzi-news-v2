import { User, Mail, Calendar, FileText, Award, Settings } from "lucide-react";

export default function ProfilePage() {
  const stats = {
    articlesWritten: 42,
    totalWords: 125000,
    avgWordsPerArticle: 2976,
    articlesPublished: 38,
    followers: 1243,
    memberSince: "Jan 2023",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your writer profile and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start space-x-6">
              <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                W
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  Writer Name
                </h2>
                <p className="text-gray-600 mb-4">
                  Professional Content Writer
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    writer@example.com
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {stats.memberSince}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bio</h3>
            <p className="text-gray-600 mb-4">
              Passionate writer with expertise in technology, business, and
              lifestyle topics. I create engaging content that educates and
              inspires readers.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Edit Bio
            </button>
          </div>

          {/* Writing Preferences */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Writing Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Technology
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Business
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Lifestyle
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Writing Style
                </label>
                <p className="text-gray-600">
                  Professional, Informative, Engaging
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Writing Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Articles Written</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.articlesWritten}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Articles Published</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.articlesPublished}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Total Words</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.totalWords.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700">Followers</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.followers.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-3 text-gray-600" />
                  <span>Personal Information</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-600" />
                  <span>Email Preferences</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-3 text-gray-600" />
                  <span>Notification Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Account Status
            </h3>
            <p className="text-blue-700 mb-4">Verified Writer ✓</p>
            <div className="text-sm text-blue-600">
              Your account is in good standing with full access to all features.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
