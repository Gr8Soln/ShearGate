import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AnalyzePage from "./pages/AnalyzePage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import ClausesPage from "./pages/ClausesPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (): void => {
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative">
        {/* Animated Background Beams */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow-delayed" />
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="relative z-10">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/clauses" element={<ClausesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<SignupPage onLogin={handleLogin} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
