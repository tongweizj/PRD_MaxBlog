import express from 'express';
// 引入用户控制器（用于权限校验）
import * as auth from '../middleware/authMiddleware.js';
import {
  readBySlug,
  articleBySlug
} from '../controllers/articlesController.js';

const router = express.Router();
router.route('/:slug').get(readBySlug);
router.param('slug', articleBySlug);
export default router;