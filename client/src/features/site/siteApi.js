import http from '../../utils/http.js';

export const getSite = () => http.get('/site');
