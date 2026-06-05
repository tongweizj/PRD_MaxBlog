import express from 'express';
// 引入控制器
import * as users from '../controllers/usersController.js';
import { protect, restrictToOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', users.isSignedIn); // 重命名为更语义化的名称

// --- 用户资源 (RESTful) ---
// 这里的路径是相对于挂载点的。如果在 app.js 挂载到 /api/users，那这里就是 /api/users/

router.post('/', users.create); // 注册
router.get('/', protect, users.list);

// 参数化路由
router
  .route('/:userId') // 对应 /api/users/:userId
  .get(users.read)
  .put(users.update)
  .delete(users.deleteUser || users.delete);

// 设置参数拦截
router.param('userId', users.userByID);

export default router;
