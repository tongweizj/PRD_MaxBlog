import { useContext } from 'react';
// 引入刚刚拆分出去的原始 Context
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  // 依然保留这层安全检查，但代码结构现在非常干净
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 包裹内使用');
  }

  // 返回状态给组件（例如：const { authname, isAuthLoading } = useAuth()）
  return context;
}