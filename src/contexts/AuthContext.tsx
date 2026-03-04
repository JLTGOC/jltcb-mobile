import type { User, UserRole } from "@/src/types/auth";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { pusher } from "../lib/pusher";
import { login, logout } from "../services/auth";

type AuthContextType = {
  role: UserRole | null;
  token: string | null;
  userData: User | null;

  isLoading: boolean;
  loginContext: typeof login;
  logoutContext: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedRole = await SecureStore.getItemAsync("role");
      const storedUser = await SecureStore.getItemAsync("userData");

      if (storedToken && storedRole) {
        setToken(storedToken);
        setRole(storedRole as UserRole);
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      }

      setIsLoading(false);
    };

    loadAuth();
  }, []);

  useEffect(() => {
    if (pusher.connectionState !== "DISCONNECTED") return;

    if (userData) {
      pusher.connect();
    } else {
      pusher.disconnect();
    }
  }, [userData]);

  const loginContext = async (loginData: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await login(loginData);

      const token = data.data.token;
      const userRole = data.data.user.role;
      const userData = data.data.user;

      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("role", userRole);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));

      setToken(token);
      setRole(userRole);
      setUserData(userData);

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logoutContext = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken) {
        await logout(storedToken);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log("Logout: Server session was already cleared.");
      } else {
        console.error("Logout: Unexpected server error", err);
      }
    } finally {
      await Promise.all([
        SecureStore.deleteItemAsync("token"),
        SecureStore.deleteItemAsync("role"),
        SecureStore.deleteItemAsync("userData"),
      ]);

      setToken(null);
      setRole(null);
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ role, token, isLoading, loginContext, logoutContext, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
