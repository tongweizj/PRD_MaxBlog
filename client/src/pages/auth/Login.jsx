import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'; // 引入加载图标

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 新增：全局加载状态

  const apiUrl = '/api/api/auth/login';

  // 检查登录状态
  const readCookie = async () => {
    try {
      const res = await axios.get('/api/api/users/me');
      console.log(`login:`, res.data);
      if (res.data.code == 200) {
        // 如果已经是登录状态，直接跳转
        navigate('/admin/dashboard', { replace: true });
      } else {
        // 如果是 auth 状态，停止加载动画，显示表单
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log('Not logged in or error:', e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const authenticateUser = async (e) => {
    e.preventDefault(); // 阻止表单提交的默认行为
    try {
      const loginData = { auth: { username, password } };
      const res = await axios.post(apiUrl, loginData);

      if (res.data.data.screen !== undefined) {
        navigate('/admin/dashboard');
      }
    } catch (e) {
      alert('Login failed, please check your credentials.');
      console.log(e);
    }
  };

  // 如果正在检查 Cookie，显示一个全屏加载，避免表单闪现
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="App container mt-5" style={{ maxWidth: '400px' }}>
      <Form onSubmit={authenticateUser}>
        {' '}
        {/* 建议使用 onSubmit */}
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default App;
