import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from "@/query-options/users/userQueryOptions";

export function useUserQuery(userId?: number) {
  return useQuery(userQueryOptions(userId));
}
