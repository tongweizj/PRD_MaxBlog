// pages/public/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="text-center py-5 my-5">
            <h1 className="fw-bold text-secondary">404</h1>
            <p className="text-muted">抱歉，您访问的页面迷路了。</p>
            <Link to="/" className="btn btn-dark btn-sm mt-3">返回首页</Link>
        </div>
    );
}

// 并在 routes.jsx 中最后追加：
// { path: '*', element: <NotFound /> }