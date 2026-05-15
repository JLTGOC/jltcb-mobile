import { queryOptions } from "@tanstack/react-query";

import { reelKeys } from "@/query-key-factories/reels";
import { fetchReel } from "@/services/reels";

export const reelQueryOptions = (reelId: string) =>
	queryOptions({
		queryKey: reelKeys.getReel(reelId),
		queryFn: () => fetchReel(reelId),
	});
