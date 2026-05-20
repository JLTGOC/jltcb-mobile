export const articleKeys = {
  all: () => ["articles"] as const,
  getArticles: () => [...articleKeys.all(), "list"] as const,
  getArticle: (articleId?: string) =>
    [...articleKeys.all(), "detail", { articleId }] as const,
};
