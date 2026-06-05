import api from '../../api/axiosInstance.js';

export const getArticles = () => api.get('/articles');

export const getArticleById = (id) => api.get(`/articles/${id}`);

export const createArticle = (data) => api.post('/articles', data);

export const updateArticle = (id, data) => api.put(`/articles/${id}`, data);