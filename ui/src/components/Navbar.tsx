import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calculator,
  History,
  BookOpen,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Analyze", path: "/analyze", icon: <Calculator size={18} />, private: true },
    { name: "History", path: "/history", icon: <History size={18} />, private: true },
    { name: "BS 5950 Clauses", path: "/clauses", icon: <BookOpen size={18} />, private: false },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e8a020] to-[#f59e0b] rounded-xl flex items-center justify-center shadow-lg shadow-[#e8a020]/20 group-hover:scale-105 transition-transform">
                <Calculator className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                ShearGate
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              (!item.private || isAuthenticated) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                      ? "bg-[#e8a020]/10 text-[#e8a020]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            ))}

            <div className="h-6 w-px bg-slate-800 mx-2" />

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={16} className="text-slate-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{user?.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs text-slate-500 truncate">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 rounded-full bg-white text-[#0f172a] text-sm font-bold hover:bg-slate-200 transition-all shadow-lg shadow-white/5 active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4">
          {navItems.map((item) => (
            (!item.private || isAuthenticated) && (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium ${isActive(item.path)
                    ? "bg-[#e8a020]/10 text-[#e8a020]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          ))}
          <div className="pt-4 border-t border-slate-800">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-400/10"
              >
                <LogOut size={20} />
                <span>Sign out</span>
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-white text-[#0f172a] font-bold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
