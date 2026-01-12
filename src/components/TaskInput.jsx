import React, { useState } from "react";
import { Plus } from "lucide-react";

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText("");
    }
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-field"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
