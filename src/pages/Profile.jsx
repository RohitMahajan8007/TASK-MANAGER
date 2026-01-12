import React, { useState } from "react";
import { Mail, Phone, MapPin, Edit3, Save, AlignLeft } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useTaskContext } from "../context/TaskContext";

const Profile = () => {
  const { currentUser, updateProfile, isSidebarOpen, setIsSidebarOpen } =
    useUser();
  const { tasks } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    role: currentUser?.role || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProcessCount = tasks.filter((t) => t.status === "in-process").length;
  const totalCount = tasks.length;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="px-6 py-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">My Profile</h1>
        <div className="flex gap-4">
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`p-2 rounded-full transition-colors flex items-center gap-2 px-4 shadow-sm ${
              isEditing
                ? "bg-accent-purple text-white shadow-purple-100"
                : "bg-white border border-gray-100 hover:bg-gray-50 text-gray-800"
            }`}
          >
            {isEditing ? (
              <>
                <Save size={20} />
                <span className="font-semibold">Save</span>
              </>
            ) : (
              <>
                <Edit3 size={20} />
                <span className="font-semibold">Edit</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2.5 rounded-full transition-all border ${
              isSidebarOpen
                ? "bg-accent-purple text-white shadow-md border-transparent"
                : "bg-white border-gray-100 text-gray-800 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <AlignLeft size={24} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-soft flex flex-col md:flex-row items-center gap-8 border border-gray-100">
        <div className="relative">
          <img
            src={currentUser?.avatar || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          {isEditing && (
            <div className="absolute bottom-2 right-2 bg-accent-purple text-white p-2 rounded-full cursor-pointer shadow-md">
              <Edit3 size={16} />
            </div>
          )}
        </div>

        <div className="text-center md:text-left space-y-2 w-full md:w-auto">
          {isEditing ? (
            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold text-gray-800 border-b-2 border-gray-100 focus:border-accent-purple focus:outline-none w-full text-center md:text-left bg-transparent py-1 transition-colors"
                placeholder="Full Name"
              />
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-card-purple font-medium border-b-2 border-gray-100 focus:border-accent-purple focus:outline-none w-full text-center md:text-left bg-transparent py-1 transition-colors"
                placeholder="Role (e.g. Designer)"
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800">
                {currentUser?.name}
              </h2>
              <p className="text-card-purple font-semibold text-lg">
                {currentUser?.role}
              </p>
            </>
          )}
          <div className="flex gap-2 justify-center md:justify-start mt-4">
            <span className="px-4 py-1.5 bg-accent-purple/10 text-accent-purple rounded-full text-xs font-bold uppercase tracking-wider">
              User ID: {currentUser?.id?.toString().slice(-4)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft space-y-8 border border-gray-100">
          <h3 className="font-bold text-xl text-gray-800">
            Contact Information
          </h3>

          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <div className="bg-card-orange/10 p-4 rounded-2xl">
                <Mail size={24} className="text-card-orange" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                  Email Address
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-card-green/10 p-4 rounded-2xl">
                <Phone size={24} className="text-card-green" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                  Phone Number
                </p>
                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="font-bold text-gray-800 text-lg border-b-2 border-gray-100 focus:border-accent-purple focus:outline-none w-full bg-transparent py-1 transition-colors"
                    placeholder="9876543210"
                    maxLength={10}
                  />
                ) : (
                  <p className="font-bold text-gray-800 text-lg">
                    {currentUser?.phone || "Not set"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-card-purple/10 p-4 rounded-2xl">
                <MapPin size={24} className="text-card-purple" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                  Location
                </p>
                {isEditing ? (
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="font-bold text-gray-800 text-lg border-b-2 border-gray-100 focus:border-accent-purple focus:outline-none w-full bg-transparent py-1 transition-colors"
                    placeholder="City, Country"
                  />
                ) : (
                  <p className="font-bold text-gray-800 text-lg">
                    {currentUser?.location || "Not set"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-gray-50 flex flex-col justify-between transition-all">
          <h3 className="font-bold text-xl text-gray-800 mb-8">
            Personal Activity
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50/50 p-6 rounded-3xl text-center border border-gray-100 shadow-sm">
              <h4 className="text-3xl font-black text-gray-800 mb-1">
                {completionRate}%
              </h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                Completion
              </p>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-3xl text-center border border-gray-100 shadow-sm">
              <h4 className="text-3xl font-black text-gray-800 mb-1">
                {tasks.length}
              </h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                Total Tasks
              </p>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-3xl text-center border border-gray-100 shadow-sm">
              <h4 className="text-3xl font-black text-gray-800 mb-1">
                {completedCount}
              </h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                Done
              </p>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-3xl text-center border border-gray-100 shadow-sm">
              <h4
                className="text-3xl font-black text-gray-800 mb-1"
                id="inProcessCountDisplay"
              >
                {inProcessCount}
              </h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                Working On
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-8 italic font-medium">
            Statistics based on your real-time data
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
