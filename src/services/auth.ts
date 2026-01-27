import api from "./axiosInstance"
import * as SecureStore from "expo-secure-store";

export async function login(loginData: {
    email: string;
    password: string;
}) {
    
    const  {data} = await api.post("/auth/login", loginData)
    return data
}

export async function logout() {
  const token = await SecureStore.getItemAsync("token"); // get token first

  if (!token) {
    throw new Error("No token found for logout");
  }

  const { data } = await api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // attach token
      },
    }
  );
  return data;
}