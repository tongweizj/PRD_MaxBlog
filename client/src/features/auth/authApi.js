import http from '../../utils/http.js';


export const whoisme = () => http.get('/users/me');
export const logout = () => http.get('/auth/signout');
export const login = (credentials) => http.post('/auth/login', credentials);
