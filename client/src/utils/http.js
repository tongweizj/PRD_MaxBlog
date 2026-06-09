import axios from 'axios';
import { config } from '../config';

const http = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000,
  withCredentials: true, 
});

// Request 拦截器
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response 拦截器
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      // 🚨 核心修复在这里：加了 window.location.pathname 的判断 🚨
      if (response.status === 401) {
        // 只有当用户不在 /login 页面时，才执行跳转
        // 如果用户已经在 /login 页面了，就静静地把错误抛出，不要再刷新页面了！
        if (window.location.pathname !== '/login') {
          console.warn('登录已过期，正在跳转...');
          window.location.href = '/login';
        }
      }

      // 提取错误信息抛给组件
      const errorMessage = response.data?.message || '服务器发生错误';
      return Promise.reject(response.data);
    }

    return Promise.reject(error);
  }
);

export default http;