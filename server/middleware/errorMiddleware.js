// middlewares/error.middleware.js
import { sendResponse } from '../utils/response.js';

export const globalErrorHandler = (err, req, res, next) => {
  // 1. 设置默认值
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // 2. 错误“翻译”逻辑 (业务级处理)
  // 处理 MongoDB 唯一索引冲突
  if (err.code === 11000) {
    statusCode = 400;
    message = `数据重复: ${Object.keys(err.keyValue)} 已存在`;
  }

  // 处理 MongoDB ID 格式错误 (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `无效的 ID 格式: ${err.value}`;
  }

  // 3. 准备返回给前端的数据 (环境处理)
  // 开发环境下，我们将 stack 堆栈信息放入 data 中返给前端
  const data =
    process.env.NODE_ENV === 'development' ? { stack: err.stack, errorDetail: err } : null;

  // 4. 最终收口：调用你的统一打包服务
  return sendResponse(res, statusCode, message, data);
};
