import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

import { whoisme, login } from '../../features/auth/authApi';

const Login = () => {
  const navigate = useNavigate();
  
  // 表单数据状态
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // 页面控制状态
  const [isPageLoading, setIsPageLoading] = useState(true); // 控制全屏加载
  const [isSubmitting, setIsSubmitting] = useState(false);  // 控制登录按钮加载状态
  const [errorMessage, setErrorMessage] = useState('');     // 控制错误提示信息

  // 1. 初始化检查：是否已经登录
  const checkAuthStatus = async () => {
    try {
      const res = await whoisme();
      console.log('身份验证检查:', res);
      
      // 前提：你的 axios 拦截器直接返回了后端完整结构 res.data
      if (res.code === 200) {
        // 已登录，跳转到后台
        navigate('/admin/dashboard', { replace: true });
      } else {
        // 未登录（正常情况），关闭 Loading 显示表单
        setIsPageLoading(false);
      }
    } catch (e) {
      // Axios 拦截器抛出的 401 等错误会走到这里
      console.log('用户未登录，停留在登录页:', e);
      setIsPageLoading(false);
    }
  };

  // 2. 组件挂载时执行检查
  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. 处理表单提交
  const authenticateUser = async (e) => {
    e.preventDefault(); // 阻止浏览器默认刷新
    
    if (!username || !password) {
      setErrorMessage('用户名和密码不能为空');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(''); // 清除上一次的错误信息

    try {
      const credentials = { auth: { username, password } };
      // 使用你配置好拦截器的 http 实例发起请求
      const res = await login(credentials);
      console.log('login(credentials):', res);
      // 根据后端的返回结构判断
      if (res.code === 200) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // 应对 code 不是 200 的业务错误
        setErrorMessage(res.message || '登录失败，请检查账号密码');
      }
    } catch (e) {
      // 捕获网络错误或拦截器 reject 出来的后端错误对象
      console.error('登录请求异常:', e);
      setErrorMessage(e.message || '登录请求失败，请稍后重试');
    } finally {
      setIsSubmitting(false); // 无论成功失败，恢复按钮状态
    }
  };

  // 4. 渲染全屏 Loading 动画（防止表单闪现）
  if (isPageLoading) {
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

      {/* 如果有错误信息，显示一个红色的提示框 */}
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
            disabled={isSubmitting} // 提交中禁用输入框
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>密码 (Password)</Form.Label>
          <Form.Control
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting} // 提交中禁用输入框
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100" 
          disabled={isSubmitting} // 提交中禁用按钮
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