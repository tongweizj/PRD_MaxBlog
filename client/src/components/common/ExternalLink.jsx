import React from 'react';

function ExternalLink({ href, children, className = '' }) {
    // 提取公共的极简花园风样式
    const defaultClass = "text-dark transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:text-neutral-500";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${defaultClass} ${className}`}
        >
            {children}
        </a>
    );
}

export default ExternalLink;