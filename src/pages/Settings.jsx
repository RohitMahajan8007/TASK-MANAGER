import React, { useState } from "react";
import {
  Moon,
  Bell,
  Shield,
  Smartphone,
  Globe,
  ChevronRight,
  AlignLeft,
} from "lucide-react";
import { useUser } from "../context/UserContext";

const Settings = () => {
  const {
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useUser();
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = () => {
    const newLang = prompt(
      "Enter Language (e.g. English, Hindi, Spanish):",
      language
    );
    if (newLang) setLanguage(newLang);
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    toggle,
    value,
    onChange,
    onClick,
  }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-full ${
            value
              ? "bg-accent-purple/10 text-accent-purple"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {toggle ? (
        <div
          onClick={() => onChange(!value)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
            value ? "bg-card-green" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              value ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      ) : (
        <ChevronRight size={20} className="text-gray-400" />
      )}
    </div>
  );

  return (
    <div className="px-6 py-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2.5 rounded-full transition-all border ${
            isSidebarOpen
              ? "bg-accent-purple text-white shadow-md border-transparent"
              : "bg-white border-gray-100 text-gray-800 hover:bg-gray-50"
          }`}
        >
          <AlignLeft size={24} />
        </button>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-soft space-y-2 border border-gray-100">
        <SettingItem
          icon={Bell}
          title="Notifications"
          subtitle="Receive updates and reminders"
          toggle
          value={notifications}
          onChange={setNotifications}
        />
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-soft space-y-2 border border-gray-100">
        <SettingItem icon={Shield} title="Privacy & Security" />
        <SettingItem
          icon={Globe}
          title="Language"
          subtitle={language}
          onClick={handleLanguageChange}
        />
      </div>

      <div className="text-center text-gray-400 text-sm pt-8">
        <p>TaskMaster v1.0.2</p>
      </div>
    </div>
  );
};

export default Settings;
