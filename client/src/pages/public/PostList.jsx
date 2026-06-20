import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getArticles } from '../../features/articles/articleApi';
import './PostList.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function PostList() {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const result = await getArticles();
        // 过滤并确保拉取的只有已发布的文章 (published)
        const articles = result.data || result;
        const publishedArticles = Array.isArray(articles)
          ? articles.filter(item => item.status === 'published')
          : [];
        setData(publishedArticles);
      } catch (error) {
        console.error('获取文章列表失败:', error);
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="writing-container">
      <header className="mb-5">
        <h1 className="writing-title mb-3">writing</h1>
        <p className="text-secondary small leading-relaxed">
          自 2015 年以来，我一直在撰写关于软件开发、设计和科技的文章。以下是按照时间倒序排列的所有文章。
        </p>
      </header>

      {showLoading ? (
        <LoadingSpinner message="Loading digital garden..." />
      ) : data.length > 0 ? (
        <main className="post-list">
          {data.map((post) => (
            <article key={post._id || post.id} className="post-item">
              {/* 展示格式化日期 YYYY-MM-DD */}
              <span className="post-date">
                {post.created ? post.created.substring(0, 10) : 'N/A'}
              </span>
              <div className="post-title-wrapper">
                {/* 🌟 核心重构：使用 Link 替换裸 a 标签，防止 SPA 刷新 */}
                <Link to={`/posts/${post.slug || post._id}`} className="post-link">
                  {post.title}
                </Link>
              </div>
            </article>
          ))}
        </main>
      ) : (
        <div className="text-muted text-center py-5 small">
          暂无发布的文章。
        </div>
      )}
    </div>
  );
}

export default PostList;