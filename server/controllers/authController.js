import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
const User = mongoose.model('User');
const jwtExpirySeconds = 3600 * 60 * 24;
const jwtKey = config.secretKey;

// 登录: 用户身份认证
import { sendResponse } from '../utils/response.js';

export const authenticate = catchAsync(async (req, res, next) => {
  // 1. 安全解构
  const { username, password } = req.body.auth || {};

  if (!username || !password) {
    return next(new AppError('请提供用户名和密码', 400));
  }

  // 2. 查找用户
  const user = await User.findOne({ username });

  // 3. 统一失败处理：用户不存在或密码不匹配
  // 提示：安全起见，不要告诉黑客是“用户名错了”还是“密码错了”
  const isMatch = user ? await bcrypt.compare(password, user.password) : false;

  if (!isMatch) {
    return next(new AppError('用户名或密码错误', 401)); // 401 是 Unauthorized
  }

  // 4. 生成 Token
  const token = jwt.sign({ id: user._id, username: user.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  // 5. 设置 Cookie
  res.cookie('token', token, {
    maxAge: jwtExpirySeconds * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 生产环境开启安全传输
  });

  // 6. 统一成功响应
  // 注意：登录接口不需要再调 next()，直接返回结果给前端
  return sendResponse(res, 200, '登录成功', {
    screen: user.username,
    userId: user._id,
  });
});

// 登出
export const signout = catchAsync((req, res) => {
  res.clearCookie('token');
  return sendResponse(res, 200, 'signed out');
});
