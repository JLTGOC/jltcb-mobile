import { fetchReel } from "@/src/api/reels";
import { reelKeys } from "@/src/query-key-factories/reels";
import { queryOptions } from "@tanstack/react-query";

export const reelQueryOptions = (reelId: string) =>
  queryOptions({
    queryKey: reelKeys.getReel(reelId),
    queryFn: () => fetchReel(reelId),
  });
