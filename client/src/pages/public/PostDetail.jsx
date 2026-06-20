import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug } from '../../features/articles/articleApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';


function PostDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        setError(false);
        const result = await getArticleBySlug(slug);
        setData(result.data || result);
      } catch (error) {
        console.error('加载文章详情失败:', error);
        setError(true);
      } finally {
        setShowLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (showLoading) {
    return (
      <LoadingSpinner message="Loading digital garden..." />
    );
  }

  if (error || !data) {
    return (
      <div className="text-center my-5 py-5">
        <p className="text-muted small">文章不存在或已被删除。</p>
        <Link to="/writing" className="btn btn-link btn-sm text-dark">返回文章列表</Link>
      </div>
    );
  }

  return (
    <div className="writing-container py-4">
      {/* 极简返回面包屑 */}
      <nav className="mb-4">
        <Link to="/writing" className="text-muted text-decoration-none small hover:text-dark">
          ← Back to writing
        </Link>
      </nav>

      <header className="mb-4">
        <h1 className="fw-bold text-dark lh-sm mb-2" style={{ fontSize: '1.75rem' }}>
          {data.title}
        </h1>
        <div className="text-muted small d-flex align-items-center gap-2">
          <span>By {data.creator?.username || data.creator?.nickName || 'Admin'}</span>
          {data.created && (
            <>
              <span className="text-black-50">•</span>
              <span>{new Date(data.created).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </header>

      {/* Markdown 文章正文渲染区域 */}
      <main className="markdown-body prose dark:prose-invert mt-4 max-w-none">

        <MarkdownRenderer content={data.content} className="mt-4" />
      </main>
    </div>
  );
}

export default PostDetail;