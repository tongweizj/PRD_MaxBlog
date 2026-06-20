import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../features/auth/authApi';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 从全局 Auth 状态中解构出当前登录状态和刷新状态的方法
  const { authname, isAuthLoading, checkAuth } = useAuth();

  // 表单数据状态
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 页面控制状态
  const [isSubmitting, setIsSubmitting] = useState(false);  // 控制登录按钮加载状态
  const [errorMessage, setErrorMessage] = useState('');     // 控制错误提示信息

  // 获取用户被拦截前原本想去的页面，如果没有，默认登录后去仪表盘
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // 2. 代替原有的 checkAuthStatus：监听全局 authname 变化
  useEffect(() => {
    if (!isAuthLoading && authname) {
      // 如果全局状态显示已经有登录名了，直接送他去该去的地方
      navigate(from, { replace: true });
    }
  }, [authname, isAuthLoading, navigate, from]);

  // 3. 处理表单提交
  const authenticateUser = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('用户名和密码不能为空');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const credentials = { auth: { username, password } };
      const res = await login(credentials);

      if (res.code === 200) {
        // 🌟 核心改动：登录成功后，立即触发全局 Auth 状态重新拉取
        // 这会更新 AuthContext 里的 authname，随后上面的 useEffect 会感应到并自动执行路由跳转
        await checkAuth();
      } else {
        setErrorMessage(res.message || '登录失败，请检查账号密码');
        setIsSubmitting(false); // 只有失败了才需要恢复按钮，成功了就等路由跳转了
      }
    } catch (e) {
      console.error('登录请求异常:', e);
      setErrorMessage(e.message || '登录请求失败，请稍后重试');
      setIsSubmitting(false);
    }
  };

  // 4. 渲染全屏 Loading 动画（由全局加载状态托管）
  if (isAuthLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <div className="mt-3 text-muted">正在验证环境...</div>
      </div>
    );
  }

  // 5. 渲染正常登录表单
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">系统登录</h2>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}

      <Form onSubmit={authenticateUser} className="shadow p-4 rounded bg-white">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>用户名 (User Name)</Form.Label>
          <Form.Control
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>密码 (Password)</Form.Label>
          <Form.Control
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">登录中...</span>
            </>
          ) : (
            '登录'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Login;