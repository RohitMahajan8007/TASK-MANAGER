import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Today from "./pages/Today";
import Projects from "./pages/Projects";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { TaskProvider } from "./context/TaskContext";
import { UserProvider, useUser } from "./context/UserContext";

const RequireAuth = ({ children }) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [currentUser, navigate, location]);

  if (!currentUser) return null;

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Today />} />
     
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
