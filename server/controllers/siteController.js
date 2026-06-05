import mongoose from 'mongoose';
const Site = mongoose.model('Site');

import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { sendResponse } from '../utils/response.js';

/**
 * 获取站点信息
 */
export const read = catchAsync(async (req, res, next) => {
  const site = await Site.findOne({});

  if (!site) {
    // 使用 AppError 抛出 404，由全局错误处理器捕获
    return next(new AppError('未找到站点配置记录', 404));
  }

  // 使用统一响应格式
  return sendResponse(res, 200, '获取站点信息成功', site);
});

/**
 * 更新站点信息
 */
export const update = catchAsync(async (req, res, next) => {
  // 1. 查找唯一的一条记录
  const site = await Site.findOne({});

  if (!site) {
    return next(new AppError('未找到要更新的记录', 404));
  }

  // 2. 解构并赋值 (保持你的手动赋值逻辑，这样更安全)
  const { profile, project, blogname, blogdescription } = req.body;

  site.profile = profile;
  site.project = project;
  site.blogname = blogname;
  site.blogdescription = blogdescription;

  // 3. 保存数据
  const updatedSite = await site.save();

  // 4. 统一响应
  return sendResponse(res, 200, '站点信息更新成功', updatedSite);
});
