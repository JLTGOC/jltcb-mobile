import { queryOptions } from "@tanstack/react-query";

import { reelKeys } from "@/query-key-factories/reels";
import { fetchReels } from "@/services/reels";

export const reelsQueryOptions = queryOptions({
	queryKey: reelKeys.getReels(),
	queryFn: fetchReels,
});
