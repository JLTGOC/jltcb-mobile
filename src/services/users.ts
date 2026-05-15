import { apiGet } from "@/services/axiosInstance";
import type { User, UserAs } from "@/types/users";

export const fetchUser = async (userId: string) =>
	apiGet<User>(`users/${userId}`);

export const fetchAsUsers = async () =>
	apiGet<{ account_specialists: UserAs[] }>("reassignment-requests/enums", {
		params: { as: true },
	});
