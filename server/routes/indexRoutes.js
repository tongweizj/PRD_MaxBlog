import express from 'express';
// 导入控制器
import { render } from '../controllers/indexController.js';
const router = express.Router();
router.get('/', render); // 访问 http://localhost:3000/
export default router;
