import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * 后台表单操作栏
 * @param {boolean} loading - 提交中的状态锁定
 * @param {string} submitText - 默认状态下的提交文字
 * @param {string} loadingText - 加载状态下的提交文字
 * @param {string} cancelPath - 点击取消时 navigate 跳转的路径
 */
function FormActions({ loading, submitText = '保存修改', loadingText = '正在保存...', cancelPath }) {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center pt-2">
            <Button
                type="submit"
                variant="primary"
                disabled={loading}
                size="sm"
                className="px-4"
            >
                {loading ? (
                    <>
                        <Spinner size="sm" animation="border" className="me-1" />
                        {loadingText}
                    </>
                ) : (
                    submitText
                )}
            </Button>

            {cancelPath && (
                <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none text-muted ms-3"
                    onClick={() => navigate(cancelPath)}
                >
                    取消
                </Button>
            )}
        </div>
    );
}

export default FormActions;