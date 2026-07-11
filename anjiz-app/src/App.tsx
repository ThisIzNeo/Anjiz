import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import DashboardPage from "./pages/DashboardPage";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      <ToastContainer
        position="top-right" 
        autoClose={1000} 
        hideProgressBar={false} 
        newestOnTop={true}
        closeOnClick 
        pauseOnHover 
      />
    </BrowserRouter>
  );
}
