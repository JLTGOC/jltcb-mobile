import type { Article } from "../types/articles";
import { apiGet } from "./axiosInstance";

export const fetchArticles = () => apiGet<Article[]>("articles");
export const fetchArticle = (articleId: string) =>
	apiGet<Article>(`articles/${articleId}`);
