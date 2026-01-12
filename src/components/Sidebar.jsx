import React, { useState } from "react";
import {
  LayoutGrid,
  FileText,
  Send,
  User,
  LogOut,
  Settings,
  AlertCircle,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/auth");
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const NavItem = ({ path, icon: Icon, label }) => (
    <button
      onClick={() => handleNavClick(path)}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 border-l-4 ${
        isActive(path)
          ? "bg-gradient-to-l from-accent-purple/5 to-surface border-accent-purple text-accent-purple shadow-sm"
          : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-primary"
      }`}
    >
      <Icon size={24} className={isActive(path) ? "text-accent-purple" : ""} />
      <span className={`font-semibold ${isActive(path) ? "" : "font-medium"}`}>
        {label}
      </span>
    </button>
  );

  return (
    <aside className="w-64 h-full bg-surface border-l flex flex-col shadow-2xl">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-card-purple">
          TaskMaster
        </h1>
      </div>

      <div className="flex-1 py-4 space-y-2">
        <NavItem path="/" icon={LayoutGrid} label="Overview" />
        <NavItem path="/report" icon={Send} label="Reports" />
        <NavItem path="/profile" icon={User} label="Profile" />
      </div>

      <div className="p-4 space-y-2 mb-4">
        <button
          onClick={() => handleNavClick("/settings")}
          className={`w-full flex items-center gap-4 px-6 py-3 transition-colors rounded-xl ${
            isActive("/settings")
              ? "text-accent-purple bg-accent-purple/5"
              : "text-gray-500 hover:text-primary hover:bg-gray-50"
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowLogoutModal(false)}
          ></div>

         
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-slide-up border border-gray-100">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-red-500" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Sign Out?
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to logout? You will need to sign in again
                to access your tasks.
              </p>

              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={confirmLogout}
                  className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-100 hover:bg-red-600 transition-all active:scale-95"
                >
                  Yes, Sign Out
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
