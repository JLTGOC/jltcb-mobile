import { articleKeys } from "@/src/query-key-factories/articles";
import { fetchArticle } from "@/src/services/articles";
import { queryOptions } from "@tanstack/react-query";

export const articleQueryOptions = (articleId: string) =>
	queryOptions({
		queryKey: articleKeys.getArticle(articleId),
		queryFn: () => fetchArticle(articleId),
	});
