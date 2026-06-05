import axios from 'axios';

const api = axios.create({
  baseURL: '/api/api', // 对应你后端的路由聚合前缀
  timeout: 5000,
  withCredentials: true, // 必须开启，否则无法发送和接收 Cookie 里的 Token
});

// Request 拦截器：
// 发送请求前自动处理
api.interceptors.request.use(
  (config) => {
    // 可以在这里统一添加 Header，或者处理加载状态
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一接住后端的 AppError
api.interceptors.response.use(
  (response) => {
    // 如果后端返回的是标准的 { status: 'success', data: ... }
    return response.data;
  },
  (error) => {
    // 这里处理所有非 2xx 的状态码
    const { response } = error;

    if (response) {
      // 1. 自动处理 401 (未登录/Token过期)
      if (response.status === 401) {
        console.warn('登录已过期，正在跳转...');
        window.location.href = '/login';
      }

      // 2. 自动提取后端 AppError 里的 message
      const errorMessage = response.data?.message || '服务器发生错误';

      // 你可以在这里配合 UI 组件（如 Toast/Message）弹出报错
      // alert(errorMessage);

      return Promise.reject(response.data);
    }

    return Promise.reject(error);
  }
);

export default api;