import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  role: string | null;
  token: string | null;
  loading: boolean;
  loginContext: (token: string, role: string) => Promise<void>;
  logoutContext: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedRole = await SecureStore.getItemAsync("role");

      if (storedToken && storedRole) {
        setToken(storedToken);
        setRole(storedRole);
      }

      setLoading(false);
    };

    loadAuth();
  }, []);

  const loginContext = async (token: string, role: string) => {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("role", role);

    setToken(token);
    setRole(role);
  };

  const logoutContext = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, token, loading, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
}
