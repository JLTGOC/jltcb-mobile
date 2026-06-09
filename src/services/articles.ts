import type { Article } from "@/types/articles";

import { apiGet } from "./axiosInstance";

export const fetchArticles = () => apiGet<Article[]>("articles");
export const fetchArticle = (articleId: number) =>
  apiGet<Article>(`articles/${articleId}`);
