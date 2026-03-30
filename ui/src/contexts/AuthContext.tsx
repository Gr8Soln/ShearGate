import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi } from "../api/client";
import { queryClient } from "../api/queryClient";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthActionLoading: boolean;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsAuthActionLoading(true);
    try {
      await authApi.logout();
    } catch (error) {
      // Logout is stateless; clear local session even when server logout fails.
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      queryClient.clear();
      setIsAuthActionLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await authApi.getMe();
      setUser(userData);
    } catch (error) {
      void logout();
    }
  }, [logout]);

  const loginWithGoogle = async (credential: string) => {
    setIsAuthActionLoading(true);
    try {
      const {
        access_token,
        refresh_token,
        user: userData,
      } = await authApi.loginWithGoogle(credential);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsAuthActionLoading(false);
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
          void logout();
        }
      }
      setIsLoading(false);
    };
    restoreSession();
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthActionLoading,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
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
