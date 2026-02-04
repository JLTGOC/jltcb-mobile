import { fetchReels } from "@/src/api/reels";
import { reelKeys } from "@/src/query-key-factories/reels";
import { queryOptions } from "@tanstack/react-query";

export const reelsQueryOptions = queryOptions({
  queryKey: reelKeys.getReels(),
  queryFn: fetchReels,
});
