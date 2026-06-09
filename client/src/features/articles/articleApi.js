import http from '../../utils/http.js';

export const getArticles = () => http.get('/articles');

export const getArticleBySlug = (slug) => http.get(`/posts/${slug}`);

export const getArticleById = (id) => http.get(`/articles/${id}`);

export const createArticle = (data) => http.post('/articles', data);

export const updateArticle = (id, data) => http
.put(`/articles/${id}`, data);