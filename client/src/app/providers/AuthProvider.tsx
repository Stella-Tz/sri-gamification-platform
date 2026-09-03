//client\src\app\providers\AuthProvider.tsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "../../api/apiClient";

import type {
  AuthUser,
} from "../../types/auth.types";

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthResponse = {
  user: AuthUser;
};

type MeResponse = {
  user: AuthUser | null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const data = await apiClient<MeResponse>("/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    void loadCurrentUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthLoading,

      login: async (input) => {
        const data = await apiClient<AuthResponse>("/auth/login", {
          method: "POST",
          body: JSON.stringify(input),
        });

        setUser(data.user);
      },

      register: async (input) => {
        await apiClient<AuthResponse>("/auth/register", {
          method: "POST",
          body: JSON.stringify(input),
        });
      },

      logout: async () => {
        await apiClient("/auth/logout", {
          method: "POST",
        });

        setUser(null);
      },

    
    }),
    [user, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};