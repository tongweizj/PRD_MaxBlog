import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute() {
  const { authname, isAuthLoading } = useAuth();
  const location = useLocation();

  // 1. 关键：如果后端验证请求还在 loading，展示一个优雅的加载动画，防止页面闪烁或误判跳转
  if (isAuthLoading) {
    return (
      <LoadingSpinner message="正在验证身份，请稍候..." fullPage variant="primary" />
    );
  }

  // 2. 如果没有登录（authname 为 null），重定向到 /login
  // 同时用 state 记住用户原本想去的页面 (location)，登录成功后可以丝滑地跳回来
  if (!authname) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. 验证通过，渲染子路由（在 App.jsx 中包裹的后台页面）
  return <Outlet />;
}