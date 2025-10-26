import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "./components/Toast";
import Landing from "./components/Landing";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <AuthProvider>
          <TicketProvider>
            <div className="d-flex flex-column min-vh-100">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <div className="d-flex flex-column min-vh-100">
                        <Header />
                        <div className="flex-grow-1">
                          <Dashboard />
                        </div>
                        <Footer />
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tickets" 
                  element={
                    <ProtectedRoute>
                      <div className="d-flex flex-column min-vh-100">
                        <Header />
                        <div className="flex-grow-1">
                          <TicketsPage />
                        </div>
                        <Footer />
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              <ToastContainer />
            </div>
          </TicketProvider>
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
};

export default App;
