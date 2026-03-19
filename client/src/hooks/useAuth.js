import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useAuth() {
  const [authname, setAuthname] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 关键：因为使用 Cookie，必须设置 withCredentials
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/api/users/me', {
          withCredentials: true, // 允许跨域发送 Cookie
        });

        // 如果成功，返回的是 payload.username
        setAuthname(response.data.data);
        console.log('response.data:', response.data);
        setIsAuthLoading(false);
      } catch (error) {
        // 如果后端返回 401 (token 不存在或失效)

        console.log('未授权或登录过期，跳转登录页');
        setAuthname(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { authname, isAuthLoading };
}
