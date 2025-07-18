import { Article, ArticleSearchParams, ArticleSearchResponse, SimpleArticle } from '@/types';
import axios, { AxiosError } from 'axios';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2';

const handleApiError = (error: unknown): never => {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    const { status } = axiosError.response;
    switch (status) {
      case 400:
        throw new Error('Bad request. Check your query parameters.');
      case 401:
        throw new Error('Unauthorized request. Make sure API key is set correctly.');
      case 429:
        throw new Error('Too many requests. You reached your per minute or per day rate limit.');
      default:
        throw new Error(`API error: ${status}`);
    }
  }
  console.error('Error fetching from NYT API:', error);
  throw new Error('Failed to fetch data. Please try again later.');
};

export const searchArticles = async (params: ArticleSearchParams): Promise<ArticleSearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/articlesearch.json`, {
      params: {
        'api-key': API_KEY,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchByQuery = async (query: string, page = 0): Promise<ArticleSearchResponse> => {
  try {
    return await searchArticles({ 
      q: query,
      page
    });
  } catch (error) {
    console.error(`Error searching articles with query: ${query}`);
    return handleApiError(error);
  }
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const response = await searchArticles({ fq: `_id:"${id}"` });
    return response.response.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching article by ID: ${id}`);
    return handleApiError(error);
  }
};

export const transformArticles = (articles: Article[]): SimpleArticle[] => {
  return articles.map(article => ({
    id: article._id,
    title: article.headline.main,
    author: article.byline?.original || "Unknown",
    publishedDate: article.pub_date,
    abstract: article.abstract || article.snippet,
    url: article.web_url,
    imageUrl: article.multimedia?.[0]?.url 
      ? `https://www.nytimes.com/${article.multimedia[0].url}` 
      : undefined
  }));
};

export const getSimpleArticles = async (params: ArticleSearchParams): Promise<SimpleArticle[]> => {
  const response = await searchArticles(params);
  return transformArticles(response.response.docs);
};

export const searchSimpleArticles = async (query: string, page = 0): Promise<SimpleArticle[]> => {
  const response = await searchByQuery(query, page);
  return transformArticles(response.response.docs);
}; 