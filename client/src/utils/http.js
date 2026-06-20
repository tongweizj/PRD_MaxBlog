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
        const errorData = {
          status: 401,
          message: response.data?.message || '服务器发生错误',
          data: response.data
        };
        return Promise.reject(errorData);
      }

      // 处理断网或服务器崩溃无响应的情况
      return Promise.reject({
        status: response.status,
        message: response.data?.message || `服务器发生错误 (${response.status})`,
        data: response.data
      });
    }
    // 3. 处理网络断开、超时、服务器崩溃完全无响应的情况
    return Promise.reject({
      status: 500,
      message: error.message || '网络连接异常，请稍后再试'
    });

  }
);

export default http;