import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, createArticle, updateArticle } from '../../features/articles/articleApi';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';

import { useAuth } from '../../hooks/useAuth';

function PostForm() {
  let navigate = useNavigate();

  let { id } = useParams(); // Get the userId param from the URL.
  const isEditMode = !!id; // 判断是否为编辑模式

  const [post, setPost] = useState({
    _id: '',
    title: '',
    content: '',
    slug: '',
    status: 'published',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { authname, loading: isAuthLoading } = useAuth();

  // 1. 如果是编辑模式，初始化时获取旧数据
  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode) {
        setFetching(true);
        const result = await getArticleById(id);
        console.log(`result: `, result);
        setPost(result.data);
        setFetching(false);
      }
    };
    fetchData();
  }, [id, isEditMode]);

  // 配置项：可以自定义工具栏、自动聚焦等
  const autofocusOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false, // 建议关闭拼写检查（中文环境下没用且费性能）
      placeholder: '开始撰写你的精彩故事...',
      // status: ["autosave", "lines", "words", "cursor"], // 底部状态栏显示信息
    };
  }, []);

  // 处理普通输入框
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // 处理 Markdown 编辑器 (Content)
  // SimpleMDE 的 onChange 返回的是直接的 value (string)
  const onContentChange = (value) => {
    setPost({ ...post, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...post, username: authname.username };
    console.log('payload:', payload);
    try {
      if (isEditMode) {
        // 编辑操作
        await updateArticle(id, payload);
      } else {
        // 创建操作
        await createArticle(payload);
      }
      navigate('/admin/posts');
    } catch (error) {
      console.error('提交失败', error);
      alert('保存失败，请检查后端接口');
    } finally {
      setLoading(false);
    }
  };
  if (fetching) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="grow" variant="primary" />
        <p>正在加载文章内容...</p>
      </div>
    );
  }

  return (
    <div>
      <Row className="">
        <Col lg={10}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">{isEditMode ? 'Edit Post' : 'Add Post'}</h5>
                  <small className="text-muted">
                    {isEditMode ? `正在修改 ID: ${id}` : '让世界看到你的想法'}
                  </small>
                </div>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
                  Back Posts
                </Button>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3 fs-6">
                      <Form.Label column sm={1} className="fs-6">
                        Title
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        name="title"
                        value={post.title}
                        onChange={onChange}
                        placeholder="在此输入标题"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-6">Slug</Form.Label>
                      <Form.Control
                        size="sm"
                        name="slug"
                        value={post.slug}
                        onChange={onChange}
                        placeholder="在此输入slug"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* 状态选择 */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold d-block">Status</Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        label="Published"
                        name="status"
                        value="published"
                        checked={post.status === 'published'}
                        onChange={onChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Draft"
                        name="status"
                        value="draft"
                        checked={post.status === 'draft'}
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="editor-container mb-3">
                  <span className="fs-6">Body</span>
                  <SimpleMDE
                    value={post.content}
                    onChange={onContentChange}
                    options={autofocusOptions}
                  />
                </div>
                <div className=" pt-3 text-start">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : isEditMode ? (
                      'Save'
                    ) : (
                      'Publish'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
//
export default PostForm;
