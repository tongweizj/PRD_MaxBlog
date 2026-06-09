import http from '../../utils/http.js';

export const getSite = () => http.get('/site');
export const updateSite = (siteData) => http.put('/site', siteData);