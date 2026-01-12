import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`tasks_${currentUser.id}`);
      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        setTasks([]);
      }
      setIsLoaded(true);
    } else {
      setTasks([]);
      setIsLoaded(false);
    }
  }, [currentUser?.id]);

  
  useEffect(() => {
    if (currentUser && isLoaded) {
      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));
    }
  }, [tasks, currentUser?.id, isLoaded]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "ongoing",
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "completed" ? "ongoing" : "completed";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, updatedFields) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTaskStatus,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
