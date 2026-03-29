import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AnalyzePage from "./pages/AnalyzePage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import ClausesPage from "./pages/ClausesPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

function AppContent() {
  const { isAuthenticated, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="app-root pb-12">
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/clauses" element={<ClausesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/login" element={<LoginPage onLogin={() => {}} />} />
          <Route path="/signup" element={<SignupPage onLogin={() => {}} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
