import { reelKeys } from "@/src/query-key-factories/reels";
import { fetchReel } from "@/src/services/reels";
import { queryOptions } from "@tanstack/react-query";

export const reelQueryOptions = (reelId: string) =>
  queryOptions({
    queryKey: reelKeys.getReel(reelId),
    queryFn: () => fetchReel(reelId),
  });
