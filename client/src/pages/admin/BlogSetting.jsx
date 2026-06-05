import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function BlogSetting(props) {
  let navigate = useNavigate();
  const { authname, isAuthLoading } = useAuth(); // 确保解构名称与 Hook 一致

  const [siteData, setSiteData] = useState({
    profile: '',
    project: '',
    blogname: '',
    blogdescription: '',
  });
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading || !authname) return;

    const fetchData = async () => {
      try {
        setShowLoading(true);
        const result = await axios.get('/api/api/site/');
        // 确保合并默认值防止 SimpleMDE 因为 null 报错
        setSiteData((prev) => ({ ...prev, ...result.data.data }));
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, [authname, isAuthLoading]);

  const updateSiteData = (e) => {
    e.preventDefault();
    setShowLoading(true);
    axios
      .put(`/api/api/site`, siteData)
      .then(() => {
        setShowLoading(false);
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        console.error('更新失败:', error);
        setShowLoading(false);
      });
  };

  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      placeholder: '输入内容...',
      minHeight: '200px',
      status: false, // 隐藏状态栏更接近截图风格
    }),
    []
  );

  if (isAuthLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="text-muted mt-2">正在验证身份...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <h5 className="mb-2 fw-normal">Blog Settings</h5>

      {showLoading ? (
        <div className="text-center p-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <Form onSubmit={updateSiteData} className="bg-white">
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={1}>
              blog name
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={siteData.blogname || ''}
                onChange={(e) => setSiteData({ ...siteData, blogname: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={1}>
              blog description
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={siteData.blogdescription || ''}
                onChange={(e) => setSiteData({ ...siteData, blogdescription: e.target.value })}
              />
            </Col>
          </Form.Group>
          {/* Project 编辑器 - 采用左标右文布局 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={1}>
              Projects List
            </Form.Label>
            <Col sm={8}>
              <SimpleMDE
                value={siteData.project}
                onChange={(val) => setSiteData({ ...siteData, project: val })}
                options={mdeOptions}
              />
              <small className="d-block text-muted fw-normal mt-1">
                Markdown format for project descriptions.
              </small>
            </Col>
          </Form.Group>

          {/* Profile 编辑器 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={1} className="fw-bold">
              Site Profile
            </Form.Label>
            <Col sm={8}>
              <SimpleMDE
                value={siteData.profile}
                onChange={(val) => setSiteData({ ...siteData, profile: val })}
                options={mdeOptions}
              />
              <small className="d-block text-muted fw-normal mt-1">
                Explain what this site is about for the homepage.
              </small>
            </Col>
          </Form.Group>

          {/* 底部保存按钮 */}
          <Row>
            <Col sm={{ span: 9, offset: 1 }}>
              <Button variant="primary" type="submit" size="sm" className="px-2">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default BlogSetting;
