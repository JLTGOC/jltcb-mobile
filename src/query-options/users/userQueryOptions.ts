import { queryOptions } from "@tanstack/react-query";

import { userKeys } from "@/query-key-factories/users";
import { fetchUser } from "@/services/users";

export const userQueryOptions = (userId?: string) =>
  queryOptions({
    queryKey: userKeys.detail(Number(userId)),
    queryFn: () => {
      if (!userId) throw new Error("userId is required");
      return fetchUser(userId);
    },
    enabled: !!userId,
  });
