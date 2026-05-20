import { queryOptions } from "@tanstack/react-query";

import { articleKeys } from "@/query-key-factories/articles";
import { fetchArticle } from "@/services/articles";

export const articleQueryOptions = (articleId: string) =>
  queryOptions({
    queryKey: articleKeys.getArticle(articleId),
    queryFn: () => fetchArticle(articleId),
  });
