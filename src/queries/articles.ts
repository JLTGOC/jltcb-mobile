import { queryOptions } from "@tanstack/react-query";

import { fetchArticle, fetchArticles } from "@/services/articles";

export const articleQueries = {
  all: () => ["articles"],
  lists: () => [...articleQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...articleQueries.lists()],
      queryFn: fetchArticles,
    }),
  details: () => [...articleQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...articleQueries.details(), id],
      queryFn: () => fetchArticle(id),
    }),
};
