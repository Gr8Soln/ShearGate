import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, refreshAuth } from "../api/client";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    localStorage.setItem("cc_access", accessToken);
    localStorage.setItem("cc_refresh", refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("cc_access");
    localStorage.removeItem("cc_refresh");
    setUser(null);
  };

  useEffect(() => {
    const restoreAuth = async () => {
      const accessToken = localStorage.getItem("cc_access");
      const refreshToken = localStorage.getItem("cc_refresh");

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const u = await getMe();
        setUser(u);
      } catch (err) {
        // Access token failed, try refresh
        if (refreshToken) {
          try {
            const res = await refreshAuth(refreshToken);
            login(res.access_token, res.refresh_token, res.user);
          } catch (refreshErr) {
            logout();
          }
        } else {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
