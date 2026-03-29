import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User } from "../types";
import { authApi } from "../api/client";
import { queryClient } from "../api/queryClient";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    queryClient.clear();
    authApi.logout().catch(() => {});
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await authApi.getMe();
      setUser(userData);
    } catch (error) {
      logout();
    }
  }, [logout]);

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    try {
      const { access_token, refresh_token, user: userData } = await authApi.loginWithGoogle(credential);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // Verify token and get user info
          const userData = await authApi.getMe();
          setUser(userData);
        } catch (error) {
          // Token might be expired, let the interceptor handle it or logout
          logout();
        }
      }
      setIsLoading(false);
    };
    restoreSession();
  }, [logout]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      loginWithGoogle,
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
