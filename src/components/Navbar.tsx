import {
  Activity,
  Book,
  History,
  Home,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
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
    { path: "/analyze", label: "Analyze", icon: Activity },
    { path: "/clauses", label: "BS 5950 Clauses", icon: Book },
  ];

  if (isAuthenticated) {
    navLinks.push({ path: "/history", label: "History", icon: History });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f12]/92 backdrop-blur-md border-b border-[#272b35] px-8 py-0 h-[60px] flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 group group select-none"
        >
          <div className="w-8 h-8 flex items-center justify-center text-[#e8a020]">
            <span className="font-bold text-2xl leading-none">BS</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#e8eaf0] tracking-wide">
              Block Shear
            </h1>
            <span className="font-mono text-[0.65rem] text-[#e8a020] bg-[rgba(232,160,32,0.12)] border border-[#9a6b15] px-1.5 py-[1px] rounded-[3px] tracking-wider uppercase inline-block self-start mt-0.5">
              Analyzer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-[#e8a020]/10 text-[#e8a020] border border-[#9a6b15]"
                    : "text-[#8890a0] hover:text-[#e8eaf0] hover:bg-[#1e2229] border border-transparent"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="w-[1px] h-6 bg-[#272b35] mx-1"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13161b] rounded-md border border-[#272b35]">
                <User className="w-4 h-4 text-[#e8a020]" />
                <span className="text-sm font-medium text-[#e8eaf0]">
                  Student User
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-[#8890a0] hover:text-[#e8eaf0] hover:bg-[#1e2229] border border-transparent rounded-md transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-[#8890a0] hover:text-[#e8eaf0] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-[#e8a020] text-[#0d0f12] text-sm font-bold rounded-md hover:bg-[#f0b030] transition-all duration-200 hover:-translate-y-[1px] shadow-[0_4px_16px_rgba(232,160,32,0.25)] border border-[#e8a020]"
              >
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
                  <User className="w-4 h-4 text-amber-400" />
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
                  className="block w-full px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-500 rounded-xl text-white font-semibold text-center hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-[1.02]"
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
