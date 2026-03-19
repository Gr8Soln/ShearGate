import { Book, History, Home, LogOut, Menu, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/analyze", label: "Analyze", icon: null },
    { path: "/clauses", label: "BS 5950 Clauses", icon: Book },
  ];

  if (isAuthenticated) {
    navLinks.push({ path: "/history", label: "History", icon: History });
  }

  return (
    <nav className="bg-white border-b border-steel-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-engineering rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <circle cx="8" cy="8" r="2" fill="white" />
                <circle cx="16" cy="8" r="2" fill="white" />
                <circle cx="8" cy="16" r="2" fill="white" />
                <circle cx="16" cy="16" r="2" fill="white" />
                <path
                  d="M8 8L16 8M16 8L16 16M16 16L8 16M8 16L8 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-steel-900">
                Block Shear Analyzer
              </h1>
              <p className="text-xs text-steel-500 -mt-0.5">
                BS 5950 Design Tool
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
                  isActive(link.path)
                    ? "bg-accent-blue text-white shadow-sm"
                    : "text-steel-600 hover:bg-steel-100"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-steel-100 rounded-lg">
                  <User className="w-4 h-4 text-steel-600" />
                  <span className="text-sm font-medium text-steel-700">
                    Student User
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-steel-600 hover:bg-steel-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-steel-600 hover:bg-steel-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-steel-200 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-accent-blue text-white"
                    : "text-steel-600 hover:bg-steel-100"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-steel-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-steel-50 rounded-lg mb-2">
                    <User className="w-4 h-4 text-steel-600" />
                    <span className="text-sm font-medium text-steel-700">
                      Student User
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-steel-600 hover:bg-steel-100 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full btn-ghost text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full btn-primary text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
