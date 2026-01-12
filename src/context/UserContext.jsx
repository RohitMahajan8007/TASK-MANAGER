import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("users");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [darkMode, setDarkMode] = useState(false);

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved ? JSON.parse(saved) : "English (US)";
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("darkMode");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  useEffect(() => {
    if (
      currentUser &&
      Array.isArray(users) &&
      !users.find((u) => u.id === currentUser.id)
    ) {
      setUsers((prev) => [...prev, currentUser]);
    }
  }, [currentUser, users]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (user && user.password === password) {
      setCurrentUser(user);
      return { success: true };
    }
    if (!user) return { success: false, message: "User not found." };
    return { success: false, message: "Incorrect password." };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (name, email, password, avatar, phone) => {
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      return false;

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone: phone || "",
      role: "Product Designer", 
      avatar:
        avatar ||
        `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 60)}`,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);

    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        updateProfile,
        users,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
