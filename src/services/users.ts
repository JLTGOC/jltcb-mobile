import { apiGet } from "@/src/services/axiosInstance";
import type { User, UserAs } from "@/src/types/users";

export const fetchUser = async (userId: string) =>
  apiGet<User>(`users/${userId}`);

export const fetchAsUsers = async () =>
  apiGet<UserAs[]>("users/account-specialists");
