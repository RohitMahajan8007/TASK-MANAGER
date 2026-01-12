import React from "react";

const StatusCard = ({ count, label, icon: Icon, color = "" }) => {

  const bgClass =
    color.split(" ").find((c) => c.startsWith("bg-")) || "bg-accent-purple";
  const activeModifiers = color
    .split(" ")
    .filter((c) => !c.startsWith("bg-"))
    .join(" ");

  return (
    <div
      className={`relative overflow-hidden p-6 rounded-[2.5rem] shadow-lg h-44 flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer group ${bgClass} ${activeModifiers}`}
    >
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>

      <div className="flex justify-between items-start relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
          <Icon size={24} className="text-white" />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-4xl font-black text-white italic leading-none mb-1">
          {count}
        </h3>
        <p className="text-[10px] text-white/80 font-bold uppercase tracking-[0.2em]">
          {label}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
