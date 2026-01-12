import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";

const DashboardLayout = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useUser();

  return (
    <div className="min-h-screen bg-background flex relative overflow-x-hidden">
     
      <div
        className={`fixed inset-y-0 right-0 z-[90] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] animate-fade-in"
        ></div>
      )}

   
      <div className="flex-1 w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
          <div className="p-0 md:p-8 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
