import React, { useState, useEffect } from "react";
import { Search, AlignLeft, Plus } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { useUser } from "../context/UserContext";

const Projects = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(`projects_${currentUser?.id}`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "App Project",
            subtitle: "Digital Product Design",
            progress: 35,
            date: "Jan 13, 2021",
            taskCount: 24,
            status: "Ongoing",
          },
          {
            id: 2,
            title: "Dashboard UI",
            subtitle: "Digital Product Design",
            progress: 28,
            date: "Jan 17, 2021",
            taskCount: 12,
            status: "Ongoing",
          },
          {
            id: 3,
            title: "App UX planning",
            subtitle: "Digital Product Design",
            progress: 85,
            date: "Jan 20, 2021",
            taskCount: 8,
            status: "Completed",
          },
        ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `projects_${currentUser.id}`,
        JSON.stringify(projects)
      );
    }
  }, [projects, currentUser]);

  const tabs = ["All", "Ongoing", "Completed"];

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectTitle.trim()) {
      const newProj = {
        id: Date.now(),
        title: newProjectTitle,
        subtitle: "Custom Project",
        progress: 0,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        taskCount: 0,
        status: "Ongoing",
      };
      setProjects([newProj, ...projects]);
      setNewProjectTitle("");
      setIsAdding(false);
    }
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.status === activeTab);

  return (
    <div className="px-6 py-4 space-y-8">
    
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">Projects</h1>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-accent-purple text-white p-2 rounded-full hover:scale-110 transition-transform shadow-md"
          >
            <Plus
              size={20}
              className={
                isAdding
                  ? "rotate-45 transition-transform"
                  : "transition-transform"
              }
            />
          </button>
        </div>
        <div className="flex gap-4">
          <button className="p-2 text-primary hover:bg-gray-100 rounded-full transition-colors">
            <Search size={24} />
          </button>
          <button className="p-2 text-primary hover:bg-gray-100 rounded-full transition-colors">
            <AlignLeft size={24} />
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-soft animate-fade-in mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Create New Project
          </h2>
          <form
            onSubmit={handleAddProject}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="Project Name (e.g. Website Redesign)"
              className="flex-1 p-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-purple"
              autoFocus
            />
            <button
              type="submit"
              className="bg-accent-purple text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white p-1 rounded-2xl flex justify-between mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${
              activeTab === tab
                ? "bg-[#8E8178] text-white shadow-md" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
