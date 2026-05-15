import { queryOptions } from "@tanstack/react-query";

import { userKeys } from "@/query-key-factories/users";
import { fetchAsUsers } from "@/services/users";

export const asQueryOptions = queryOptions({
	queryFn: fetchAsUsers,
	queryKey: userKeys.getAsUsers(),
});
