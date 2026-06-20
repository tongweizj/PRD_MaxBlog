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
            // 区分正常的未登录状态和系统异常
            if (error.status !== 401) {
                console.error('❌ [Auth] 获取身份异常:', error.message);
            } else {
                console.warn('⚡ [Auth] 用户未登录或会话过期');
            }
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

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 包裹内使用');
    }
    return context;
}
