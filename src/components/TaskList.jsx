import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, title }) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
            {tasks.length}
          </span>
        </div>
      )}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
