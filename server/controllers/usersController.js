import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { sendResponse } from '../utils/response.js';

const User = mongoose.model('User');
const jwtKey = config.secretKey;

// --- 中间件部分 ---

// 1. 根据 ID 加载用户 (参数预载)
export const userByID = catchAsync(async (req, res, next, id) => {
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError(`未找到 ID 为 ${id} 的用户`, 404));
  }
  req.user = user;
  next();
});

// 2. 权限拦截中间件 (重构版)
export const requiresLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError('请先登录', 401));
  }

  try {
    const payload = jwt.verify(token, jwtKey);
    req.auth = payload; // 将解密后的用户信息挂载到 req.auth
    next();
  } catch (e) {
    return next(new AppError('登录令牌无效或已过期', 401));
  }
};

// --- 控制器部分 ---

// 创建用户
export const create = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  const savedUser = await user.save();

  // 注意：Mongoose save 失败通常会抛出错误，被 catchAsync 捕获
  // 这里处理成功逻辑即可
  return sendResponse(res, 201, '用户创建成功', savedUser);
});

// 获取用户列表
export const list = catchAsync(async (req, res, next) => {
  const users = await User.find({}).select('-password'); // 列表通常不返回密码
  return sendResponse(res, 200, '获取用户列表成功', users);
});

// 读取当前用户 (配合 userByID 使用)
export const read = (req, res) => {
  // req.user 已经由 userByID 准备好了
  return sendResponse(res, 200, '读取用户信息成功', req.user);
};

// 更新用户
export const update = catchAsync(async (req, res, next) => {
  // 使用 findByIdAndUpdate，并开启 runValidators 以确保更新也经过模型验证
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  return sendResponse(res, 200, '用户信息更新成功', user);
});

// 删除用户
export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  return sendResponse(res, 200, '用户删除成功', null);
});

// 检查是否已登录 (用于前端路由守卫)
export const isSignedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return sendResponse(res, 200, '未登录', { screen: 'auth' });
  }

  try {
    const payload = jwt.verify(token, jwtKey);
    return sendResponse(res, 200, '已登录', payload);
  } catch (e) {
    return next(new AppError('登录状态失效', 401));
  }
};
