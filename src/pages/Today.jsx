import React, { useState, useEffect } from "react";
import {
  Search,
  AlignLeft,
  Plus,
  RefreshCw,
  Clock,
  CheckSquare,
  XCircle,
} from "lucide-react";
import StatusCard from "../components/StatusCard";
import TaskItem from "../components/TaskItem";
import { useTaskContext } from "../context/TaskContext";
import { useUser } from "../context/UserContext";

const Today = () => {
  const { tasks, toggleTask, addTask, updateTaskStatus, deleteTask, editTask } =
    useTaskContext();
  const { currentUser, isSidebarOpen, setIsSidebarOpen } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const ongoingCount = tasks.filter((t) => t.status === "ongoing").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProcessCount = tasks.filter((t) => t.status === "in-process").length;

  const filteredTasks = tasks.filter((t) => {
    const title = t.title || t.text || "";
    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === "all") return true;
    return t.status === filter;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, newTaskDesc);
      setNewTaskTitle("");
      setNewTaskDesc("");
      setIsAdding(false);
    }
  };

  return (
    <div className="px-6 py-4 space-y-8">
    
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              {formattedDate}
            </p>
            <h1 className="text-2xl font-bold text-gray-800">
              Hi, {currentUser?.name?.split(" ")[0] || "User"}!
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-full transition-all ${
                showSearch
                  ? "bg-accent-purple text-white shadow-md border-transparent"
                  : "bg-white border border-gray-100 text-primary hover:bg-gray-100"
              }`}
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 rounded-full transition-all ${
                isSidebarOpen
                  ? "bg-accent-purple text-white shadow-md border-transparent"
                  : "bg-white border border-gray-100 text-primary hover:bg-gray-100"
              }`}
            >
              <AlignLeft size={24} />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="animate-fade-in relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your tasks..."
              className="w-full p-4 pl-12 rounded-2xl bg-white border border-gray-100 shadow-soft focus:outline-none focus:border-accent-purple transition-all text-gray-800 placeholder-gray-400"
              autoFocus
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-accent-purple hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div
          onClick={() => setFilter(filter === "ongoing" ? "all" : "ongoing")}
        >
          <StatusCard
            label="Ongoing"
            count={ongoingCount}
            icon={RefreshCw}
            color={`${
              filter === "ongoing"
                ? "ring-4 ring-accent-purple ring-offset-2 scale-105"
                : ""
            } bg-card-purple`}
          />
        </div>
        <div
          onClick={() =>
            setFilter(filter === "in-process" ? "all" : "in-process")
          }
        >
          <StatusCard
            label="In Process"
            count={inProcessCount}
            icon={Clock}
            color={`${
              filter === "in-process"
                ? "ring-4 ring-card-orange ring-offset-2 scale-105"
                : ""
            } bg-card-orange`}
          />
        </div>
        <div
          onClick={() =>
            setFilter(filter === "completed" ? "all" : "completed")
          }
        >
          <StatusCard
            label="Completed"
            count={completedCount}
            icon={CheckSquare}
            color={`${
              filter === "completed"
                ? "ring-4 ring-card-green ring-offset-2 scale-105"
                : ""
            } bg-card-green`}
          />
        </div>
      </div>

  
      <div className="bg-white md:p-8 md:rounded-[2.5rem] md:shadow-soft rounded-3xl p-6 shadow-sm min-h-[400px] border border-gray-50 transition-all">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-3xl font-black text-gray-800">
              Tasks List
            </h2>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-accent-purple text-white p-2.5 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
          <span className="text-gray-400 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
            {filter === "all"
              ? "All Tasks"
              : `${filter.replace("-", " ")} Tasks`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="cursor-pointer"
              >
                <TaskItem
                  task={task}
                  onToggle={toggleTask}
                  onStatusUpdate={(status) => updateTaskStatus(task.id, status)}
                  onDelete={() => deleteTask(task.id)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center text-gray-400 italic flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-300 border border-gray-100">
                <CheckSquare size={48} />
              </div>
              <p className="font-bold uppercase tracking-wider text-sm">
                No {filter === "all" ? "" : filter.replace("-", " ")} tasks
                found.
              </p>
            </div>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-slide-down border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Task
            </h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full p-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:border-accent-purple transition-all outline-none text-gray-800 placeholder-gray-400"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">
                  Description (List details)
                </label>
                <textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Add more details or a list here..."
                  className="w-full p-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:border-accent-purple transition-all outline-none min-h-[120px] resize-none text-black font-medium"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl font-bold bg-accent-purple text-white shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {selectedTask &&
        (() => {
          const liveTask = tasks.find((t) => t.id === selectedTask.id);
          if (!liveTask) {
e
            return null;
          }
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-slide-down relative border border-gray-100">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle size={28} />
                </button>
                <div className="space-y-6">
                  <div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                        liveTask.status === "completed"
                          ? "bg-card-green/10 text-card-green"
                          : liveTask.status === "in-process"
                          ? "bg-card-orange/10 text-card-orange"
                          : "bg-card-purple/10 text-card-purple"
                      }`}
                    >
                      {liveTask.status}
                    </span>
                    <input
                      type="text"
                      value={liveTask.title || liveTask.text}
                      onChange={(e) =>
                        editTask(liveTask.id, { title: e.target.value })
                      }
                      className="w-full text-3xl font-black text-gray-800 bg-transparent border-none focus:outline-none mt-4 leading-tight placeholder-gray-400"
                      placeholder="Task Title"
                    />
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                      <Clock size={12} />
                      Created:{" "}
                      {new Date(
                        liveTask.createdAt || liveTask.id
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="h-px bg-gray-100 w-full"></div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">
                      Description / Details
                    </h3>
                    <textarea
                      value={liveTask.description || ""}
                      onChange={(e) =>
                        editTask(liveTask.id, { description: e.target.value })
                      }
                      placeholder="Add more details here..."
                      className="w-full bg-gray-50 rounded-2xl p-6 text-gray-800 leading-relaxed resize-none min-h-[150px] border border-gray-100 focus:border-accent-purple focus:outline-none transition-all placeholder-gray-400"
                    />
                  </div>

                  <div className="flex gap-3 pt-6">
                    {liveTask.status !== "completed" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTaskStatus(liveTask.id, "completed");
                          setSelectedTask(null);
                        }}
                        className="flex-1 py-4 rounded-2xl font-bold bg-card-green text-white shadow-lg hover:shadow-card-green/20 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckSquare size={20} />
                        Mark Completed
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(liveTask.id);
                        setSelectedTask(null);
                      }}
                      className="flex-1 py-4 rounded-2xl font-bold bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default Today;
