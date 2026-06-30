import { fetchReel, fetchReels } from "@/services/reels";
import { queryOptions } from "@tanstack/react-query";

export const reelQueries = {
  all: () => ["reels"],
  lists: () => [...reelQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...reelQueries.lists()],
      queryFn: fetchReels,
    }),
  details: () => [...reelQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...reelQueries.details(), id],
      queryFn: () => fetchReel(id),
    }),
};
