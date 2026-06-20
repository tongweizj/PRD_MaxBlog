import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, createArticle, updateArticle } from '../../features/articles/articleApi';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import FormActions from '../../components/admin/FormActions';

// 辅助函数：将任何日期转换为 HTML5 datetime-local 输入框所需的 YYYY-MM-DDTHH:mm 格式
const formatDatetimeLocal = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const pad = (num) => String(num).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [post, setPost] = useState({
    title: '',
    content: '',
    slug: '',
    status: 'published',
    created: formatDatetimeLocal(new Date()), // 新增：默认当前时间
  });

  const [loading, setLoading] = useState(false);       // 用于提交表单时的 Loading
  const [fetching, setFetching] = useState(false);     // 用于编辑模式下获取初始化数据的 Loading

  // 1. 如果是编辑模式，获取旧数据
  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode) {
        try {
          setFetching(true);
          const result = await getArticleById(id);
          const articleData = result.data || result;
          setPost({
            title: articleData.title || '',
            content: articleData.content || '',
            slug: articleData.slug || '',
            status: articleData.status || 'published',
            created: formatDatetimeLocal(articleData.created),
          });
        } catch (error) {
          console.error('加载文章详情失败:', error.message || error);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchData();
  }, [id, isEditMode]);

  // 配置编辑器
  const autofocusOptions = useMemo(() => ({
    autofocus: false,
    spellChecker: false,
    placeholder: "开始撰写文章内容...",
  }), []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const onContentChange = (value) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  // 2. 提交表单逻辑
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title.trim() || !post.content.trim()) {
      alert("请完整填写标题和内容！");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateArticle(id, post);
      } else {
        await createArticle(post);
      }
      // 🌟 修复：保存成功后切回列表页
      navigate('/admin/posts');
    } catch (error) {
      console.error('保存文章失败:', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="text-muted small mt-2">正在拉取文章详情...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold m-0">{isEditMode ? '修改文章' : '写新文章'}</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">文章标题</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={post.title}
                        placeholder="请输入标题"
                        onChange={onChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">自定义 Slug (URL 别名)</Form.Label>
                      <Form.Control
                        type="text"
                        name="slug"
                        value={post.slug}
                        placeholder="例如: my-first-post"
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">发布时间</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="created"
                        value={post.created}
                        onChange={onChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold d-block">发布状态</Form.Label>
                      <div className="mt-2">
                        <Form.Check
                          inline
                          type="radio"
                          label="发布"
                          name="status"
                          value="published"
                          checked={post.status === 'published'}
                          onChange={onChange}
                          className="small"
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="草稿"
                          name="status"
                          value="draft"
                          checked={post.status === 'draft'}
                          onChange={onChange}
                          className="small"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="editor-container mb-4">
                  <Form.Label className="small fw-semibold">文章正文</Form.Label>
                  <SimpleMDE
                    value={post.content}
                    onChange={onContentChange}
                    options={autofocusOptions}
                  />
                </div>

                <div className="text-start">
                  <FormActions
                    loading={loading}
                    submitText={isEditMode ? '保存修改' : '立即发布'}
                    cancelPath="/admin/posts"
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PostForm;