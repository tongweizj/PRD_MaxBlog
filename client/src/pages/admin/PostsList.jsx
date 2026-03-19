import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getArticles } from '../../features/articles/articleApi';

function PostsList(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = '/api/api/articles';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArticles();
        setData(result.data);
        setShowLoading(false);
      } catch (error) {
        console.error('获取文章列表失败:', error);
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/admin/post/edit/' + id);
  };

  const createPost = () => {
    navigate('/admin/post/create'); // 假设这是创建页面的路由
  };

  return (
    <div>
      {/* 顶部标题与创建按钮区域 */}
      <Row className="align-items-center mb-4">
        <Col>
          <h5 className="fw-bold">Posts</h5>
          <span className="text-muted small">All({data.length})</span>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-primary"
            onClick={createPost}
            className="d-flex align-items-center"
          >
            Add Post
          </Button>
        </Col>
      </Row>

      {/* 内容区域 */}
      {showLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">加载中...</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border">
          {data.length !== 0 ? (
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Title</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item._id || idx} style={{ cursor: 'pointer' }}>
                    <td className="ps-4 align-middle" onClick={() => showDetail(item._id)}>
                      <div className="fw-medium text-primary">{item.title}</div>
                      <small className="text-muted">{item._id}</small>
                    </td>
                    <td className="align-middle small">{item.status}</td>
                    <td className="align-middle text-muted small">
                      {item.created ? new Date(item.created).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="text-end pe-4 align-middle">
                      <span className="text-body-tertiary">
                        <Link
                          to={`/admin/post/edit/${item._id}`}
                          className="btn btn-link btn-sm text-decoration-none p-0"
                        >
                          Edit
                        </Link>
                      </span>
                      <span className="ms-3 text-body-tertiary">
                        <Link
                          to={`/post/${item._id}`}
                          className="btn btn-link btn-sm text-decoration-none p-0"
                        >
                          View
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">暂无文章内容</p>
              <Button variant="outline-primary" onClick={createPost}>
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
