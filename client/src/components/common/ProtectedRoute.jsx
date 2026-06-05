import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from 'react-bootstrap';

// 这个组件包裹任何需要保护的内容
const ProtectedRoute = ({ children }) => {
  const { authname, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>正在验证权限...</p>
      </div>
    );
  }

  if (!authname) {
    // 如果没有用户名（即验证失败），跳转到登录页
    return <Navigate to="/login" replace />;
  }

  // 验证通过，展示页面内容
  return children;
};

export default ProtectedRoute;
