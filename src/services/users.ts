import type { UserAs } from "../types/users";
import { apiGet } from "./axiosInstance";

export const fetchAsUsers = async () =>
	apiGet<UserAs[]>("users/account-specialists");
