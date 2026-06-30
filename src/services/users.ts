<<<<<<< HEAD
import type { UserAs } from "../types/users";
import { apiGet } from "./axiosInstance";

export const fetchAsUsers = async () =>
	apiGet<UserAs[]>("users/account-specialists");
=======
import { apiGet } from "@/services/axiosInstance";
import type { User, UserAs } from "@/types/users";

export const fetchUser = async (userId: number) =>
  apiGet<User>(`users/${userId}`);

export const fetchAsUsers = async () =>
  apiGet<{ account_specialists: UserAs[] }>("reassignment-requests/enums", {
    params: { as: true },
  });
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
