import config from '../config/index.js';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const jwtKey = config.secretKey;

// 1. 登录拦截 (原 requiresLogin)
export const protect = catchAsync(async (req, res, next) => {
  // 从 cookie 中获取 token
  const token = req.cookies.token;

  if (!token) {
    // 之前你返回的是 { screen: 'auth' }，现在建议返回 401
    // 前端 axios 拦截器根据 401 状态码决定跳转到登录页
    return next(new AppError('请先登录', 401));
  }

  try {
    const payload = jwt.verify(token, jwtKey);
    // 建议挂载到 req.user 或 req.userId，这是行业标准
    req.userId = payload.id;
    next();
  } catch (e) {
    return next(new AppError('登录过期或无效，请重新登录', 401));
  }
});

// 2. 资源操作权限校验 (原 hasAuthorization)
export const restrictToOwner = catchAsync(async (req, res, next) => {
  // 此时路由中的 param 中间件应该已经把 article 挂载到了 req 上
  if (!req.article) {
    return next(new AppError('未发现相关资源', 404));
  }

  // 比较文章创建者 ID 和当前登录用户 ID
  // 注意：Mongoose 的 ID 是对象，需要转换为字符串进行比较
  const isOwner = req.article.creator._id.toString() === req.userId.toString();

  if (!isOwner) {
    return next(new AppError('您没有权限操作此资源', 403));
  }

  next();
});
