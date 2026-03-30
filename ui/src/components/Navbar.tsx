import {
  BookOpen,
  Calculator,
  Loader2,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isAuthActionLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const location = useLocation();
  const firstName = user?.name?.split(" ")[0] ?? "User";
  const avatarUrl = user?.avatar_url?.trim() || "";

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [avatarUrl]);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />,
    },
    {
      name: "Analyze",
      path: "/analyze",
      icon: <Calculator size={16} />,
      private: true,
    },
    {
      name: "BS 5950 Clauses",
      path: "/clauses",
      icon: <BookOpen size={16} />,
      private: false,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#090a0c]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="text-[#e8a020] text-2xl font-black tracking-tighter">
                BS
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-[1.1rem] font-black tracking-tight text-white uppercase">
                  ShearGate
                </span>
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-[#e8a020] uppercase border border-[#e8a020]/30 px-1 py-0.5 rounded-sm bg-[#e8a020]/5 w-fit">
                  Analyzer
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/5 mr-6">
              {navItems.map(
                (item) =>
                  (!item.private || isAuthenticated) && (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        isActive(item.path)
                          ? "bg-[#161a1f] text-[#e8a020] shadow-sm"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive(item.path) && (
                        <div className="w-1 h-1 rounded-full bg-[#e8a020]" />
                      )}
                      <span>{item.name}</span>
                    </Link>
                  ),
              )}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <div className="h-10 flex items-center space-x-2 px-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-[#161a1f] border border-white/10 shrink-0">
                      {avatarUrl && !avatarLoadFailed ? (
                        <img
                          src={avatarUrl}
                          alt={`${firstName} avatar`}
                          className="w-full h-full object-cover"
                          onError={() => setAvatarLoadFailed(true)}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#e8a020]">
                          {firstName?.[0] ? (
                            <span className="text-[10px] font-black uppercase">
                              {firstName[0]}
                            </span>
                          ) : (
                            <UserIcon size={12} />
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-300">
                      {firstName}
                    </span>
                  </div>
                  <button
                    onClick={() => void logout()}
                    disabled={isAuthActionLoading}
                    aria-label="Logout"
                    className={`group inline-flex items-center justify-center h-10 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-red-400 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden ${
                      isAuthActionLoading
                        ? "w-[124px] px-3"
                        : "w-10 hover:w-[92px] px-0 hover:px-3"
                    }`}
                  >
                    {isAuthActionLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin shrink-0" />
                        <span className="ml-2 text-xs font-bold whitespace-nowrap">
                          Logging out
                        </span>
                      </>
                    ) : (
                      <>
                        <LogOut size={14} className="shrink-0" />
                        <span className="ml-0 max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[56px] group-hover:opacity-100 whitespace-nowrap text-xs font-bold transition-all duration-200">
                          Logout
                        </span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/auth" className="btn-primary">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#090a0c] border-b border-white/5 px-4 pt-2 pb-6 space-y-2">
          {navItems.map(
            (item) =>
              (!item.private || isAuthenticated) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold ${
                    isActive(item.path)
                      ? "bg-[#e8a020]/10 text-[#e8a020]"
                      : "text-slate-400"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ),
          )}
          <div className="pt-4 flex flex-col gap-2">
            <Link to="/auth" className="btn-primary w-full text-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
