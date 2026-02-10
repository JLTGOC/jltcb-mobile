import type { User } from "../types/auth";
import { apiPost } from "./axiosInstance";

export async function login(loginData: { email: string; password: string }) {
  const data = await apiPost<{ token: string; user: User }, typeof loginData>(
    "auth/login",
    loginData,
  );
  return data;
}

export async function logout(token: string) {
  const data = await apiPost<number>(
    "auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    },
  );
  return data;
}
