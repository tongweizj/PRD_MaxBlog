import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../../features/articles/articleApi';

function ListArticles() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await axios.get(apiUrl);
        const result = await getArticles();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  const showDetail = (slug) => {
    navigate('/posts/' + slug);
  };

  return (
    <div>
      <header className="mb-5">
        <h1 className="fw-bold mb-3">writing</h1>
        <p className="text-secondary">
          自 2015
          年以来，我一直在撰写关于软件开发、设计和科技的文章。以下是按照时间倒序排列的所有文章。
        </p>
      </header>

      {showLoading ? (
        // 居中显示加载动画
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : data.length > 0 ? (
        <main>
          {/* 使用 list-group-flush 移除外边框，适合文章列表 */}
          <div className="list-group list-group-flush">
            {data.map((item) => (
              <a
                key={item.slug} 
                href={`/posts/${item.slug}`}
                className="list-group-item list-group-item-action border-0 px-0 py-3"
                style={{ fontSize: '1.1rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  showDetail(item.slug);
                }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </main>
      ) : (
        <p className="text-muted">No articles found.</p>
      )}
    </div>
  );
}

export default ListArticles;
