import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';

// Components
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
const Home = lazy(() => import('./pages/public/Home'));
const PostList = lazy(() => import('./pages/public/PostList'));
const PostDetail = lazy(() => import('./pages/public/PostDetail'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const PostsList = lazy(() => import('./pages/admin/PostsList'));
const PostForm = lazy(() => import('./pages/admin/PostForm'));
const BlogSetting = lazy(() => import('./pages/admin/BlogSetting'));
const AccountSettings = lazy(() => import('./pages/admin/AccountSettings'));


// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


// 包裹 Suspense 容器的高阶函数，防止路由切换时白屏
const suspenseWrapper = (Component) => (
    <Suspense fallback={<LoadingSpinner message="正在加载组件..." />}>
        {Component}
    </Suspense>
);

const routes = [
    // 1. Auth
    { path: 'login', element: suspenseWrapper(<Login />) },
    { path: 'signup', element: suspenseWrapper(<Register />) },

    // 2. 公共前台路由 (嵌套在 PublicLayout 中)
    {
        element: <PublicLayout />,
        children: [
            { index: true, element: suspenseWrapper(<Home />) },
            { path: 'home', element: suspenseWrapper(<Home />) },
            { path: 'writing', element: suspenseWrapper(<PostList />) },
            { path: 'posts/:slug', element: suspenseWrapper(<PostDetail />) },
        ],
    },

    // 3. 私有后台路由 (嵌套在 ProtectedRoute 守卫与 AdminLayout 中)
    {
        path: 'admin',
        element: <ProtectedRoute />, // 路由守卫作为父节点
        children: [
            {
                element: <AdminLayout />, // 守卫通过后，渲染后台布局
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: 'dashboard', element: suspenseWrapper(<Dashboard />) },
                    { path: 'posts', element: suspenseWrapper(<PostsList />) },
                    { path: 'post/create', element: suspenseWrapper(<PostForm />) },
                    { path: 'post/edit/:id', element: suspenseWrapper(<PostForm />) },
                    { path: 'setting', element: suspenseWrapper(<BlogSetting />) },
                    { path: 'profile', element: suspenseWrapper(<AccountSettings />) },
                ],
            },
        ],
    },

    // 4. 兜底通配符：如果输错了 URL，自动跳回首页（或你可以加个 404 页面）
    // { path: '*', element: <Navigate to="/" replace /> }
    { path: '*', element: <NotFound /> }
];

export default routes;