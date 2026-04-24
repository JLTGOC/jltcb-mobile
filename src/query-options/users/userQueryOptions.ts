import { queryOptions } from "@tanstack/react-query";

import { userKeys } from "@/src/query-key-factories/users";
import { fetchUser } from "@/src/services/users";

export const userQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: userKeys.detail(Number(userId)),
		queryFn: () => fetchUser(userId),
		enabled: !!userId,
	});
