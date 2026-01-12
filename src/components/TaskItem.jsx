import React, { useState } from "react";
import {
  ChevronRight,
  Check,
  Clock,
  Trash2,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react";

const TaskItem = ({ task, onToggle, onStatusUpdate, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isCompleted = task.status === "completed";
  const isInProcess = task.status === "in-process";
  const isOngoing = task.status === "ongoing";

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-card-green border-card-green";
      case "in-process":
        return "bg-card-orange border-card-orange";
      default:
        return "border-gray-300";
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    onDelete();
    setShowDeleteModal(false);
  };

  const handleStatusChange = (e, status) => {
    e.stopPropagation();
    onStatusUpdate(status);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  return (
    <div className="bg-white rounded-[1.5rem] p-4 flex flex-col gap-3 shadow-sm mb-3 transition-all hover:shadow-md border border-gray-100">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${getStatusColor()}`}
        >
          {isCompleted && <Check size={14} className="text-white" />}
          {isInProcess && <Clock size={14} className="text-white" />}
          {isOngoing && <RefreshCw size={14} className="text-white" />}{" "}
          
        </button>

        <div className="flex items-start justify-between">
          <h3
            className={`font-semibold text-gray-800 ${
              isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title || task.text || "Untitled Task"}
          </h3>
        </div>
      </div>


      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusUpdate("in-process"); 
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isInProcess
                ? "bg-card-orange text-white shadow-md shadow-orange-100"
                : "bg-orange-50 text-card-orange hover:bg-orange-100"
            }`}
          >
            <Clock size={12} /> In Process
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusUpdate("ongoing"); 
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isOngoing
                ? "bg-accent-purple text-white shadow-md shadow-purple-100"
                : "bg-purple-50 text-accent-purple hover:bg-purple-100"
            }`}
          >
            <RefreshCw size={12} className={isOngoing ? "animate-spin" : ""} />
            Ongoing
          </button>
          <button
            onClick={handleDeleteClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-card-red hover:bg-card-red hover:text-white transition-all`}
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>


      {showDeleteModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(false);
            }}
          ></div>
          <div
            className="bg-white w-full max-w-xs rounded-[2rem] p-6 shadow-2xl relative z-10 animate-slide-up border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={32} className="text-card-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Delete Task?
              </h3>
              {task.description && (
                <p className="text-xs text-gray-400 line-clamp-1">
                  {task.description}
                </p>
              )}
              <p className="text-gray-500 text-sm mb-6">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(false);
                  }}
                  className="flex-1 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-card-red text-white font-bold rounded-xl shadow-lg shadow-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
