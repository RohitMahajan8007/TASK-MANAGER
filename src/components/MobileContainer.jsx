import React from "react";

const MobileContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#F2F4F8] min-h-[90vh] h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col border-[8px] border-white">

        <div className="px-8 pt-6 pb-2 flex justify-between items-center text-xs font-semibold text-gray-800 z-10 shrink-0">
          <span>9:41</span>
          <div className="flex gap-1">
            <span className="h-2 w-2 bg-black rounded-full"></span>
            <span className="h-2 w-2 bg-black rounded-full"></span>
            <span className="h-2 w-2 bg-black rounded-full"></span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
