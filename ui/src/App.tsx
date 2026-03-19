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
      <div className="app-root pb-12">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="main-content">
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
