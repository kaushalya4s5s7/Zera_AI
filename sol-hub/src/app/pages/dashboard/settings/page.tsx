"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      security: true,
      updates: false,
      marketing: false,
    },
    account: {
      name: "Alex Johnson",
      email: "alex@example.com",
      language: "en",
      timezone: "UTC-5",
    },
    security: {
      twoFactor: true,
      sessionTimeout: "30",
    },
  });

  const handleNotificationChange = (key: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]:
          !settings.notifications[key as keyof typeof settings.notifications],
      },
    });
  };

  const handleAccountChange = (key: string, value: string) => {
    setSettings({
      ...settings,
      account: {
        ...settings.account,
        [key]: value,
      },
    });
  };

  const handleSecurityChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: key === "twoFactor" ? !settings.security.twoFactor : value,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-gray-300">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Account Settings */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Account Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={settings.account.name}
                onChange={(e) => handleAccountChange("name", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.account.email}
                onChange={(e) => handleAccountChange("email", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.account.language}
                onChange={(e) =>
                  handleAccountChange("language", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={settings.account.timezone}
                onChange={(e) =>
                  handleAccountChange("timezone", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="UTC-12">UTC-12</option>
                <option value="UTC-11">UTC-11</option>
                <option value="UTC-10">UTC-10</option>
                <option value="UTC-9">UTC-9</option>
                <option value="UTC-8">UTC-8 (PST)</option>
                <option value="UTC-7">UTC-7 (MST)</option>
                <option value="UTC-6">UTC-6 (CST)</option>
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC-4">UTC-4</option>
                <option value="UTC-3">UTC-3</option>
                <option value="UTC-2">UTC-2</option>
                <option value="UTC-1">UTC-1</option>
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+1">UTC+1 (CET)</option>
                <option value="UTC+2">UTC+2</option>
                <option value="UTC+3">UTC+3</option>
                <option value="UTC+4">UTC+4</option>
                <option value="UTC+5">UTC+5</option>
                <option value="UTC+5.5">UTC+5.5 (IST)</option>
                <option value="UTC+6">UTC+6</option>
                <option value="UTC+7">UTC+7</option>
                <option value="UTC+8">UTC+8</option>
                <option value="UTC+9">UTC+9 (JST)</option>
                <option value="UTC+10">UTC+10</option>
                <option value="UTC+11">UTC+11</option>
                <option value="UTC+12">UTC+12</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange("email")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Browser Notifications
                </h4>
                <p className="text-sm text-gray-400">
                  Show browser push notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.browser}
                  onChange={() => handleNotificationChange("browser")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Security Alerts</h4>
                <p className="text-sm text-gray-400">
                  Notifications about critical security issues
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.security}
                  onChange={() => handleNotificationChange("security")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Product Updates</h4>
                <p className="text-sm text-gray-400">
                  Get notified about new features and updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.updates}
                  onChange={() => handleNotificationChange("updates")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Marketing Communications
                </h4>
                <p className="text-sm text-gray-400">
                  Receive news, offers and promotions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketing}
                  onChange={() => handleNotificationChange("marketing")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Security Settings
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-400">
                  Enhance security with 2FA
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={() =>
                    handleSecurityChange(
                      "twoFactor",
                      !settings.security.twoFactor
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  handleSecurityChange("sessionTimeout", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Your session will expire after this period of inactivity
              </p>
            </div>

            <div>
              <button className="w-full px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">API Keys</h3>
            <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm">
              Generate New Key
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">
              Use API keys to access SecureWeb3 services programmatically
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm font-medium text-white">Production Key</p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: Apr 8, 2025
                </p>
              </div>
              <button className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors text-xs">
                Revoke
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm font-medium text-white">
                  Development Key
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: Apr 2, 2025
                </p>
              </div>
              <button className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors text-xs">
                Revoke
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
