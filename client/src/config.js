// src/config.js

// 解构并设置默认值，防止由于未配置环境变量导致程序崩溃
const { 
  VITE_API_BASE_URL = '/api',
  VITE_APP_TITLE = 'My MERN App'
} = import.meta.env;

// 集中导出
export const config = {
  apiBaseUrl: VITE_API_BASE_URL,
  appTitle: VITE_APP_TITLE,
  isDev: import.meta.env.DEV,   // Vite 内置：是否为开发环境
  isProd: import.meta.env.PROD  // Vite 内置：是否为生产环境
};