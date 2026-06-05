/**
 * 统一响应格式工具
 * @param {Response} res - Express 的 response 对象
 * @param {number} code - 业务状态码 (200 为成功)
 * @param {string} message - 提示信息
 * @param {any} data - 返回的数据内容
 */
export const sendResponse = (res, code, message, data = null) => {
  const responsePayload = {
    code,
    message,
    data,
  };

  // 根据业务状态码自动设置对应的 HTTP 状态码
  // 通常 200 开头代表成功，400 代表客户端错误，500 代表服务端错误
  const httpStatus = code >= 200 && code < 300 ? 200 : code;

  return res.status(httpStatus).json(responsePayload);
};
