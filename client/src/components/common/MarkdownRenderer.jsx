import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * 统一 Markdown 渲染器
 * @param {string} content - Markdown 字符串
 * @param {string} className - 附加类名
 */
function MarkdownRenderer({ content, className = '' }) {
    if (!content) return null;

    return (
        <div className={`prose dark:prose-invert max-w-none markdown-body ${className}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownRenderer;