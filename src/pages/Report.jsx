import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  AlignLeft,
  Download,
  FileText,
  X,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTaskContext } from "../context/TaskContext";

const Report = () => {
  const navigate = useNavigate();
  const { tasks } = useTaskContext();
  const { isSidebarOpen, setIsSidebarOpen } = useUser();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [reportType, setReportType] = useState("Weekly");

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const ongoingCount = tasks.filter(
    (t) => t.status === "ongoing" || t.status === "in-process"
  ).length;

  const taskData = [
    { name: "Mon", completed: 5, ongoing: 3 },
    { name: "Tue", completed: 7, ongoing: 2 },
    { name: "Wed", completed: 4, ongoing: 5 },
    { name: "Thu", completed: 8, ongoing: 1 },
    { name: "Fri", completed: 6, ongoing: 4 },
    { name: "Sat", completed: 3, ongoing: 2 },
    { name: "Sun", completed: 9, ongoing: 1 },
  ];

  const projectData = [
    { name: "Sat", value: 2 },
    { name: "Sun", value: 4 },
    { name: "Mon", value: 3 },
    { name: "Tue", value: 6 },
    { name: "Wed", value: 5 },
    { name: "Thu", value: 7 },
    { name: "Fri", value: 8 },
  ];

  return (
    <div className="px-6 py-4 space-y-6">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 dark:text-gray-100 md:hidden"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">Weekly Report</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Performance Analytics
            </p>
          </div>
        </div>
        <div className="flex gap-3 text-gray-600">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="p-2.5 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-all text-primary"
            title="Download Report"
          >
            <Download size={20} />
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2.5 rounded-full transition-all ${
              isSidebarOpen
                ? "bg-accent-purple text-white shadow-md border-transparent"
                : "bg-white border border-gray-100 text-primary hover:bg-gray-50"
            }`}
          >
            <AlignLeft size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <div className="space-y-6">
   
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
    
              <div className="bg-[#8E8178] rounded-[2rem] p-6 relative overflow-hidden text-white shadow-xl h-44 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-4xl font-black mb-1">{completedCount}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                    Done This Week
                  </p>
                </div>
             
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-all"></div>
              </div>

              <div className="bg-[#ECA869] rounded-[2rem] p-6 relative overflow-hidden text-white shadow-xl h-44 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-4xl font-black mb-1">{ongoingCount}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                    Currently Active
                  </p>
                </div>
             
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-all"></div>
              </div>
            </div>
          </div>


          <div className="bg-white p-8 rounded-[2.5rem] shadow-soft h-96 border border-gray-50 transition-all">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-800 text-xl">
                  Productivity Chart
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Daily Performance
                </p>
              </div>
              <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple text-[10px] font-black rounded-full uppercase">
                Week 02
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData} barGap={12}>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 700 }}
                    dy={10}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      backgroundColor: "#ffffff",
                      color: "#1e1e1e",
                    }}
                  />
                  <Bar
                    dataKey="completed"
                    fill="#8E8178"
                    radius={[8, 8, 8, 8]}
                    barSize={14}
                  />
                  <Bar
                    dataKey="ongoing"
                    fill="#ECA869"
                    radius={[8, 8, 8, 8]}
                    barSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

    
        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft flex flex-col border border-gray-50 transition-all h-full lg:h-auto min-h-[500px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-800 text-xl">
                Progress overview
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Growth Velocity
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-black text-gray-500 uppercase">
                {reportType}
              </span>
            </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectData}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 700 }}
                  dy={10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    backgroundColor: "#ffffff",
                    color: "#1e1e1e",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ECA869"
                  strokeWidth={4}
                  dot={{
                    r: 5,
                    fill: "#ECA869",
                    strokeWidth: 3,
                    stroke: "#ffffff",
                  }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
         
          <div className="mt-8 p-6 bg-accent-purple/5 rounded-[2rem] border border-accent-purple/10 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-bold text-accent-purple mb-1">
                Excellent!
              </p>
              <p className="text-xs text-gray-500">
                You've completed <span className="font-black">12% more</span>{" "}
                tasks than last week.
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-purple text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

    
      {showDownloadModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowDownloadModal(false)}
          ></div>
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-slide-up border border-gray-100">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-3xl flex items-center justify-center mb-6">
                <FileText size={32} className="text-accent-purple" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Download Analysis
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Choose your preferred format for the weekly productivity report.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <button
                  onClick={() => {
                    alert("PDF Report Generating...");
                    setShowDownloadModal(false);
                  }}
                  className="flex flex-col items-center p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <FileText className="text-red-500 mb-2" size={24} />
                  <span className="text-xs font-bold text-gray-700">PDF</span>
                </button>
                <button
                  onClick={() => {
                    alert("Excel Sheet Generating...");
                    setShowDownloadModal(false);
                  }}
                  className="flex flex-col items-center p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <FileText className="text-green-500 mb-2" size={24} />
                  <span className="text-xs font-bold text-gray-700">Excel</span>
                </button>
              </div>

              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
