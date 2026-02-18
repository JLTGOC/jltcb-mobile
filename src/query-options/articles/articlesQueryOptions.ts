import { articleKeys } from "@/src/query-key-factories/articles";
import { fetchArticles } from "@/src/services/articles";
import { queryOptions } from "@tanstack/react-query";

export const articlesQueryOptions = queryOptions({
	queryKey: articleKeys.getArticles(),
	queryFn: fetchArticles,
});
