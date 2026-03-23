import { queryOptions } from "@tanstack/react-query";
import { userKeys } from "@/src/query-key-factories/users";
import { fetchAsUsers } from "@/src/services/users";

export const asQueryOptions = queryOptions({
	queryFn: fetchAsUsers,
	queryKey: userKeys.getAsUsers(),
});
