import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { whoisme } from '../features/auth/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authname, setAuthname] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            setIsAuthLoading(true);
            const response = await whoisme();

            // 这里的赋值需要对齐你 http.js 拦截器和 authApi 的返回结构
            // 假设 http.js 返回了 response.data，而后端结构是 { data: "username" }
            // 如果 http.js 已经过滤到了最里层，这里可能直接是 response
            const username = response?.data || response;

            setAuthname(username);
        } catch (error) {
            console.warn('⚡ [Auth] 未授权或登录过期:', error.message || error);
            setAuthname(null);
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // 暴露登出或手动刷新的方法
    const logoutLocal = () => {
        setAuthname(null);
    };

    return (
        <AuthContext.Provider value={{ authname, isAuthLoading, checkAuth, logoutLocal }}>
            {children}
        </AuthContext.Provider>
    );
}
