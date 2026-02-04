import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { routes } from "../constants/routes";
import { useNavigate } from "../hooks/useNavigate";
import { login, logout } from "../services/auth";
import { User } from "@/src/types/auth";

type AuthContextType = {
  role: string | null;
  token: string | null;
  userData: User | null;

  isLoading: boolean;
  loginContext: typeof login;
  logoutContext: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { replace } = useNavigate();

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedRole = await SecureStore.getItemAsync("role");
      const storedUser = await SecureStore.getItemAsync("userData");

      if (storedToken && storedRole) {
        setToken(storedToken);
        setRole(storedRole);
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      }

      setIsLoading(false);
    };

    loadAuth();
  }, []);

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

      if (router.canGoBack()) router.dismissAll();
      replace(routes.HOME);

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

      if (router.canGoBack()) router.dismissAll();
      replace(routes.HOME);
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
