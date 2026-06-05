import express from 'express';
// 引入用户控制器（用于权限校验）
import * as auth from '../middleware/authMiddleware.js';
// 引入文章控制器
import {
  create,
  list,
  articleByID,
  read,
  update,
  deleteArticle,
} from '../controllers/articlesController.js';

const router = express.Router();

// --- 路径：/api/articles ---
router.route('/').get(list).post(auth.protect, create);

// --- 路径：/api/articles/:articleId ---
router.route('/:articleId').get(read).put(auth.protect, update).delete(auth.protect, deleteArticle);

// 设置参数拦截器
router.param('articleId', articleByID);

export default router;
