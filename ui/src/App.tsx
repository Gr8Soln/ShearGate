import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { queryClient } from "./api/queryClient";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import ClausesPage from "./pages/ClausesPage";
import AuthPage from "./pages/AuthPage";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-[#e8a020]/30 selection:text-[#e8a020]">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route 
                    path="/analyze" 
                    element={
                      <PrivateRoute>
                        <AnalyzePage />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/results/:id" 
                    element={
                      <PrivateRoute>
                        <ResultsPage />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/history" 
                    element={
                      <PrivateRoute>
                        <HistoryPage />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/clauses" element={<ClausesPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
