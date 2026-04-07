import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./assets/context/AuthContext";
import { ThemeProvider } from "./assets/context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./assets/pages/Home";
import { Login } from "./assets/pages/Login";
import { Register } from "./assets/pages/Register";
import { Dashboard } from "./assets/pages/Dashboard";
import { WorkerDashboard } from "./assets/pages/WorkerDashboard";
import { AdminDashboard } from "./assets/pages/AdminDashboard";
import { BookingPage } from "./assets/pages/BookingPage";
import { EmergencyBooking } from "./assets/pages/EmergencyBooking";
import { Services } from "./assets/pages/Services";
import { Profile } from "./assets/pages/Profile";
import { Invoice } from "./assets/pages/Invoice";
import { Toaster } from "sonner";
import { useNotifications } from "./assets/hooks/useNotifications";
import "./index.css";
const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

const AppContent = () => {
  useNotifications();
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="user">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/worker"
          element={
            <PrivateRoute role="worker">
              <WorkerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute role="user">
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/emergency"
          element={
            <PrivateRoute role="user">
              <EmergencyBooking />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
