import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * 全局统一 Loading 动画
 * @param {string} message - 提示文字
 * @param {boolean} fullPage - 是否占满全屏居中（用于路由守卫、全屏加载）
 * @param {string} variant - 动画颜色 (dark, light, primary 等)
 */
function LoadingSpinner({ message = 'Loading...', fullPage = false, variant = 'dark' }) {
    const containerStyle = fullPage
        ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }
        : { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 0' };

    return (
        <div style={containerStyle} className="loading-spinner-container text-center">
            <Spinner animation="border" variant={variant} role="status" className="mb-2">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="text-muted small fw-light">{message}</div>
        </div>
    );
}

export default LoadingSpinner;