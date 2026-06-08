import express from 'express';
// 引入各个子路由模块
import indexRoutes from './indexRoutes.js';
import userRoutes from './userRoutes.js';
import articleRoutes from './articleRoutes.js';
import siteRoutes from './siteRoutes.js';
import authRoutes from './authRoutes.js';
import postRoutes from './postRoutes.js';

const router = express.Router();

router.use('/', indexRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/posts', postRoutes);
router.use('/site', siteRoutes);

export default router;
