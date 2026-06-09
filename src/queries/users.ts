import { fetchUser } from "@/services/users";
import { queryOptions } from "@tanstack/react-query";

export const userQueries = {
  all: () => ["users"],
  details: () => [...userQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => fetchUser(id),
    }),
};
