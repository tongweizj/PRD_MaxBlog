// 设置默认运行环境
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// 加载模块依赖
import configureMongoose from './config/mongoose.js';
import configureExpress from './app.js';

// 1. 初始化 Mongoose 连接并加载所有模型
// 注意：必须先执行这一步，否则后续路由中的 mongoose.model() 会找不到 Schema
const db = configureMongoose();

// 2. 初始化 Express 应用
const app = configureExpress();

// 3. 监听端口
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000/');
});

// 使用 export default 代替 module.exports
export default app;
