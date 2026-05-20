import { queryOptions } from "@tanstack/react-query";

import { articleKeys } from "@/query-key-factories/articles";
import { fetchArticles } from "@/services/articles";

export const articlesQueryOptions = queryOptions({
  queryKey: articleKeys.getArticles(),
  queryFn: fetchArticles,
});
