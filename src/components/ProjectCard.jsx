import React from "react";
import { CheckSquare, Calendar } from "lucide-react";

const ProjectCard = ({ title, subtitle, progress, date, taskCount, team }) => {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-[1.5rem] p-6 mb-4 shadow-soft">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>

     
        <div className="relative flex items-center justify-center">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="rotate-[-90deg]"
          >
            <circle
              stroke="#E5E7EB"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#70C989" 
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <span className="absolute text-sm font-bold text-gray-800">
            {progress}%
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>

        <div className="bg-gray-50 px-3 py-1 rounded-lg flex items-center gap-2 text-gray-400 text-xs font-bold italic">
          <CheckSquare size={14} />
          <span>{taskCount} Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
