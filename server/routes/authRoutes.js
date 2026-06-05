import express from 'express';
// 引入控制器
import * as auth from '../controllers/authController.js';
const router = express.Router();
// --- 认证相关 ---
router.post('/login', auth.authenticate);
router.get('/signout', auth.signout);
export default router;
