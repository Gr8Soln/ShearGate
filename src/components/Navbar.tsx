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
    <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:translate-y-[-2px] transition-all duration-200 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">BS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">Block Shear Analyzer</h1>
            <p className="text-xs text-gray-400">BS 5950 Design Tool</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:translate-y-[-2px] ${
                isActive(link.path)
                  ? "bg-white/10 text-white shadow-lg shadow-purple-500/10"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">
                  Student User
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 hover:translate-y-[-2px]"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-y-[-2px]">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 hover:translate-y-[-2px] hover:scale-105">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive(link.path)
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/10">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl mb-2 border border-white/10">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">
                    Student User
                  </span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl text-white font-semibold text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-[1.02]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
