import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F2F4F8]">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
};

export default Layout;
