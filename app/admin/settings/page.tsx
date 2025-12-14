"use client";

import {
  Code,
  CreditCard,
  Database,
  Download,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Palette,
  Save,
  Shield,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "NewsRoom Pro",
    siteUrl: "https://newsroom.example.com",
    contactEmail: "editor@example.com",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",

    // Content Settings
    autoApprove: false,
    maxArticlesPerWriter: 5,
    defaultCategory: "General",
    allowComments: true,
    commentModeration: true,

    // User Settings
    requireEmailVerification: true,
    allowWriterRegistration: false,
    writerRole: "contributor",

    // Email Settings
    emailNotifications: true,
    newSubmissionAlert: true,
    dailyDigest: true,
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 24, // hours
    passwordExpiry: 90, // days
    ipWhitelist: "",

    // Payment Settings (if applicable)
    enablePayments: false,
    currency: "USD",
    writerPayoutRate: 0.1, // per word

    // API & Integration
    enableAPI: false,
    apiKey: "••••••••••••••••",
    googleAnalyticsId: "",
    facebookPixelId: "",

    // Appearance
    theme: "light",
    primaryColor: "#2563eb",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",

    // Backup & Export
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: 30, // days
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // In real app, save to backend
  };

  const tabs = [
    { id: "general", label: "General", icon: <Globe className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <Database className="h-4 w-4" /> },
    { id: "users", label: "Users", icon: <User className="h-4 w-4" /> },
    { id: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="h-4 w-4" />,
    },
    { id: "api", label: "API", icon: <Code className="h-4 w-4" /> },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="h-4 w-4" />,
    },
    { id: "backup", label: "Backup", icon: <Download className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your newsroom platform settings
        </p>
      </div>

      <div className="bg-white rounded-xl shadow">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-8">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Site Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      aria-label="site-name"
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        setSettings({ ...settings, siteName: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site URL
                    </label>
                    <input
                      aria-label="site-url"
                      type="url"
                      value={settings.siteUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, siteUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      aria-label="contact-email"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contactEmail: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      aria-label="timezone"
                      value={settings.timezone}
                      onChange={(e) =>
                        setSettings({ ...settings, timezone: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (PT)
                      </option>
                      <option value="Europe/London">GMT (London)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Settings */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-approve Articles</h4>
                    <p className="text-sm text-gray-500">
                      Automatically publish articles from trusted writers
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="auto-approve articles"
                      type="checkbox"
                      checked={settings.autoApprove}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          autoApprove: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Comments</h4>
                    <p className="text-sm text-gray-500">
                      Allow readers to comment on articles
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="enable comments"
                      type="checkbox"
                      checked={settings.allowComments}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          allowComments: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Comment Moderation</h4>
                    <p className="text-sm text-gray-500">
                      Require admin approval for comments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="comment moderation"
                      disabled={!settings.allowComments}
                      type="checkbox"
                      checked={settings.commentModeration}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          commentModeration: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Articles Per Writer (Daily)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={settings.maxArticlesPerWriter}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxArticlesPerWriter: parseInt(e.target.value),
                      })
                    }
                    className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* User Settings */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Verification Required</h4>
                    <p className="text-sm text-gray-500">
                      Users must verify email before writing
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="email verification"
                      id="emailVerification"
                      type="checkbox"
                      checked={settings.requireEmailVerification}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          requireEmailVerification: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Allow Writer Registration</h4>
                    <p className="text-sm text-gray-500">
                      Allow users to sign up as writers
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="allow writer registration"
                      id="allowWriterRegistration"
                      type="checkbox"
                      checked={settings.allowWriterRegistration}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          allowWriterRegistration: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Writer Role
                  </label>
                  <select
                    aria-label="writer-role"
                    value={settings.writerRole}
                    onChange={(e) =>
                      setSettings({ ...settings, writerRole: e.target.value })
                    }
                    className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="contributor">Contributor</option>
                    <option value="writer">Writer</option>
                    <option value="editor">Editor</option>
                    <option value="staff">Staff Writer</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          twoFactorAuth: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (hours)
                  </label>
                  <select
                    aria-label="session timeout"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={1}>1 hour</option>
                    <option value={4}>4 hours</option>
                    <option value={8}>8 hours</option>
                    <option value={24}>24 hours</option>
                    <option value={168}>1 week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <select
                    aria-label="password expiry"
                    value={settings.passwordExpiry}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        passwordExpiry: parseInt(e.target.value),
                      })
                    }
                    className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={30}>30 days</option>
                    <option value={60}>60 days</option>
                    <option value={90}>90 days</option>
                    <option value={180}>180 days</option>
                    <option value={365}>Never</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Whitelist (comma-separated)
                  </label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) =>
                      setSettings({ ...settings, ipWhitelist: e.target.value })
                    }
                    placeholder="192.168.1.1, 10.0.0.1"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to allow all IPs
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable REST API</h4>
                    <p className="text-sm text-gray-500">
                      Allow external services to access your content
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      aria-label="enable api"
                      name="enableAPI"
                      id="enableAPI"
                      type="checkbox"
                      checked={settings.enableAPI}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          enableAPI: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex items-center">
                    <input
                      placeholder="sk_live_1234567890abcdef"
                      type={showApiKey ? "text" : "password"}
                      value={
                        showApiKey
                          ? "sk_live_1234567890abcdef"
                          : settings.apiKey
                      }
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-4 py-2 border border-l-0 rounded-r-lg hover:bg-gray-50"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex space-x-3 mt-3">
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Generate New Key
                    </button>
                    <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                      Copy Key
                    </button>
                    <button className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                      Revoke Key
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        googleAnalyticsId: e.target.value,
                      })
                    }
                    placeholder="UA-XXXXXXXXX-X"
                    className="w-full md:w-96 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.facebookPixelId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        facebookPixelId: e.target.value,
                      })
                    }
                    placeholder="123456789012345"
                    className="w-full md:w-96 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Backups</h4>
                    <p className="text-sm text-gray-500">
                      Automatically backup database and content
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      placeholder="Enable Automatic Backups"
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          autoBackup: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Frequency
                  </label>
                  <select
                    aria-label="backup frequency"
                    value={settings.backupFrequency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backupFrequency: e.target.value,
                      })
                    }
                    className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Retention (days)
                  </label>
                  <input
                    placeholder="30"
                    type="number"
                    min="1"
                    max="365"
                    value={settings.backupRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backupRetention: parseInt(e.target.value),
                      })
                    }
                    className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="pt-6">
                  <h4 className="font-medium text-lg mb-4">
                    Manual Operations
                  </h4>
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-5 w-5 mr-2" />
                      Backup Now
                    </button>
                    <button className="flex items-center px-4 py-3 border rounded-lg hover:bg-gray-50">
                      <Upload className="h-5 w-5 mr-2" />
                      Restore Backup
                    </button>
                    <button className="flex items-center px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <X className="h-5 w-5 mr-2" />
                      Delete Old Backups
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-8 border-t mt-8 flex justify-end space-x-4">
            <button className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors">
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      {activeTab === "general" && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Danger Zone
          </h3>
          <p className="text-red-600 mb-4">
            Irreversible and destructive actions
          </p>
          <div className="space-y-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Clear All Caches
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-100">
              Reset All Settings
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-100">
              Delete All User Data
            </button>
            <button className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900">
              Delete Entire Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
