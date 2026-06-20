import React, { useState, useEffect } from 'react';
import { Table, Spinner, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getArticles } from '../../features/articles/articleApi';

function PostsList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const fetchPostList = async () => {
    try {
      setShowLoading(true);
      const result = await getArticles();
      // 兼容可能被 http.js 脱壳或未脱壳的结构
      setData(result.data || result);
    } catch (error) {
      console.error('获取文章列表失败:', error.message || error);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  const createPost = () => {
    navigate('/admin/post/create');
  };

  return (
    <div className="container-fluid p-0">
      {/* 顶部标题与创建按钮区域 */}
      <Row className="align-items-center mb-4">
        <Col>
          <h5 className="fw-bold m-0">文章管理</h5>
          <span className="text-muted small">共 {data.length} 篇文章</span>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            size="sm"
            onClick={createPost}
            className="d-flex align-items-center"
          >
            <i className="bi bi-plus-lg me-1"></i> 写文章
          </Button>
        </Col>
      </Row>

      {/* 列表主体 */}
      {showLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" role="status" className="mb-2" />
          <div className="text-muted small">正在加载文章列表...</div>
        </div>
      ) : (
        <div className="bg-white rounded shadow-sm">
          {data.length > 0 ? (
            <Table hover responsive className="align-middle mb-0 text-nowrap">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">标题</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th className="text-end pe-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-4 fw-medium text-wrap" style={{ maxWidth: '300px' }}>
                      {item.title}
                    </td>
                    <td>
                      <span className={`badge bg-${item.status === 'published' ? 'success' : 'secondary'}-subtle text-${item.status === 'published' ? 'success' : 'secondary'} border`}>
                        {item.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {item.created ? new Date(item.created).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="text-end pe-4">
                      <Link
                        to={`/admin/post/edit/${item._id}`}
                        className="btn btn-link btn-sm text-decoration-none me-2 p-0"
                      >
                        编辑
                      </Link>
                      <Link
                        to={`/posts/${item.slug || item._id}`}
                        target="_blank"
                        className="btn btn-link btn-sm text-decoration-none text-info p-0"
                      >
                        预览
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-3">暂无文章内容</p>
              <Button variant="outline-primary" size="sm" onClick={createPost}>
                立即去写第一篇
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostsList;