import mongoose from 'mongoose';
const { model } = mongoose;
const Article = model('Article');
const User = model('User');
import catchAsync from '../utils/catchAsync.js';
import { sendResponse } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getErrorMessage = (err) => {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

// 1. 创建文章
export const create = catchAsync(async (req, res, next) => {
  // 1. 显式解构你需要的字段，绝对不要解构 _id
  const { title, content, slug, status } = req.body;

  // 2. 创建一个纯净的数据对象，不带任何多余属性
  const articleData = {
    title: title || '',
    content: content || '',
    slug: slug || `post-${Date.now()}`,
    status: status || 'draft',
  };

  const article = new Article(articleData);
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return next(new AppError('User not found', 400));
  }

  article.creator = user._id;
  const savedArticle = await article.save();

  return sendResponse(res, 201, 'Sccuss create post', savedArticle);
});

// 2. 列表查询
export const list = catchAsync(async (req, res) => {
  const articles = await Article.find()
    .sort('-created')
    .populate('creator', 'username nickName email');
  // res.status(200).json(articles);
  return sendResponse(res, 200, 'Sccuss get post list', articles);
});

// 4. 读取单篇
export const read = (req, res) => {
  console.log(`req.article:${req.article}`);
  return sendResponse(res, 200, 'Sccuss get post ', req.article);
};

// 5. 更新文章
export const update = catchAsync(async (req, res) => {
  const article = req.article;
  // 使用 Object.assign 批量更新属性
  Object.assign(article, req.body);

  await article.save();
  return sendResponse(res, 200, 'Sccuss update post', article);
});

// 6. 删除文章
export const deleteArticle = catchAsync(async (req, res) => {
  const article = req.article;
  await article.deleteOne(); // Mongoose 6+ 建议使用 deleteOne 而不是 remove
  return sendResponse(res, 200, 'Sccuss detele post', article);
});

// 凡是url中出现articleByID的，直接根据 ID 加载文章
export const articleByID = async (req, res, next, id) => {
  const article = await Article.findById(id).populate('creator', 'username nickName email');
  console.log(`article: ${article}`);
  if (!article) {
    return next(new AppError(`Failed to load article${id}`, 404));
  }
  req.article = article;
  next();
};

// // 凡是url中出现articleByID的，直接根据 ID 加载文章
// export const articleByID = catchAsync(async (req, res, next, id) => {
//   const article = await Article.findById(id).populate('creator', 'username nickName email');
//   if (!article) {
//     return next(new AppError(`Failed to load article${id}`, 404));
//   }
//   req.article = article;
//   next();
// });
