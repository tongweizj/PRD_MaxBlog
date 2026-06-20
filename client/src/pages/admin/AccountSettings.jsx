import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/http'; // 统一使用重构后的 http 实例
import { useAuth } from '../../context/AuthContext';
import FormActions from '../../components/admin/FormActions';
function EditUser() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // 修改用户名后，可能需要刷新全局的 Context 状态

  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showLoading, setShowLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. 初始化时获取当前登录用户的基本信息（主要是回显当前的用户名）
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setShowLoading(true);
        setErrorMsg('');
        // 注意：因为是修改“当前自己的”密码，后端通常提供 /api/users/profile 或 /api/users/me 接口
        // 如果后端依然需要传 id，可以通过 useParams 获取或从 AuthContext 的 user 状态里拿
        const response = await http.get('/users/me');
        const userData = response.data || response;

        setFormData((prev) => ({
          ...prev,
          username: userData.username || '',
        }));
      } catch (error) {
        console.error('加载用户信息失败:', error);
        setErrorMsg(error.message || '无法加载当前用户信息');
      } finally {
        setShowLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. 提交修改
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // 基础表单校验
    if (!formData.username.trim()) {
      setErrorMsg('用户名不能为空');
      return;
    }

    // 如果用户输入了新密码，则触发密码修改校验
    if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.oldPassword) {
        setErrorMsg('请输入旧密码以验证身份');
        return;
      }
      if (formData.newPassword.length < 6) {
        setErrorMsg('新密码长度不能少于 6 位');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setErrorMsg('两次输入的新密码不一致');
        return;
      }
    }

    try {
      setSubmitLoading(true);

      // 构建发送给后端的数据 payload
      const payload = {
        username: formData.username.trim(),
      };
      // 如果用户打算改密码，才把密码字段传给后端
      if (formData.newPassword) {
        payload.oldPassword = formData.oldPassword;
        payload.newPassword = formData.newPassword;
      }

      // 调用后端更新接口
      await http.put('/users/update-profile', payload);

      setSuccessMsg('账户信息更新成功！');

      // 密码或用户名修改后，清空密码输入框
      setFormData((prev) => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      // 同步刷新顶层 Context 中的用户信息（防止右上角显示的用户名不同步）
      await checkAuth();

      // 3秒后自动跳回后台仪表盘
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error('更新账户失败:', error);
      setErrorMsg(error.message || '更新失败，请检查旧密码是否正确');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (showLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="text-muted small mt-2">正在加载个人资料...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <Row className="justify-content-start">
        <Col xs={12} lg={8} xl={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold m-0">安全与账户设置</h5>
              <span className="text-muted small">在此修改您的登录用户名或密码</span>
            </Card.Header>
            <Card.Body className="p-4">

              {errorMsg && <Alert variant="danger" className="py-2 small">{errorMsg}</Alert>}
              {successMsg && <Alert variant="success" className="py-2 small">{successMsg}</Alert>}

              <Form onSubmit={handleUpdateUser}>
                {/* 用户名修改 */}
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold">用户名 (Username)</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                    placeholder="请输入新的用户名"
                    required
                  />
                </Form.Group>

                <hr className="my-4 text-muted opacity-25" />
                <h6 className="fw-bold mb-3 text-secondary">修改密码 (如不修改请留空)</h6>

                {/* 旧密码 */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold">当前旧密码</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={onChange}
                    placeholder="若要修改密码，请输入当前密码"
                  />
                </Form.Group>

                {/* 新密码 */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold">新密码</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={onChange}
                    placeholder="请输入新密码 (最少 6 位)"
                  />
                </Form.Group>

                {/* 确认新密码 */}
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold">确认新密码</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    placeholder="请再次输入新密码"
                  />
                </Form.Group>

                {/* 提交按钮区域 */}
                <div className="d-flex align-items-center">
                  <FormActions loading={submitLoading} submitText="保存修改" cancelPath="/admin/dashboard" />

                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditUser;