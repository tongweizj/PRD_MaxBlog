在 Express 中，最成熟的 RESTful API 目录结构是基于 **MVC (Model-View-Controller)** 模式的变体。
由于我们做的是前后端分离的 API，所以不需要 `View`（视图层由 React 负责），取而代之的是 `Routes`（路由层）。

## 最佳实践目录结构

以下是目前社区公认的 **Express RESTful API 最佳实践目录结构**：

### 📂 Express MVC 目录结构

```text
server/
├── config/             # 配置中心 (数据库连接、全局常量)
│   ├── db.js           # Mongoose/Sequelize 连接逻辑
│   └── index.js        # 统一导出 process.env 变量
├── controllers/        # 控制器 (业务逻辑层)
│   ├── authController.js # 处理注册、登录、Token 逻辑
│   └── postController.js # 处理博客/任务的增删改查
├── middleware/         # 中间件 (拦截器)
│   ├── authMiddleware.js # JWT 权限验证
│   └── errorMiddleware.js# 全局错误处理捕获
├── models/             # 模型层 (数据结构/Schema)
│   ├── User.js         # 用户模型
│   └── Post.js         # 博客内容模型
├── routes/             # 路由层 (路径定义)
│   ├── index.js        # 路由总入口 (汇聚所有模块路由)
│   ├── authRoutes.js   # /api/auth/* 相关路径
│   └── postRoutes.js   # /api/posts/* 相关路径
├── utils/              # 工具类 (通用函数)
│   ├── catchAsync.js   # 专门消除 try-catch 的高阶函数
│   └── AppError.js     # 自定义错误类
├── app.js              # Express 实例配置 (中间件挂载、路由绑定)
├── server.js           # 项目启动文件 (监听端口、数据库启动)
└── .env                # 环境变量

```

---

### 🛠️ 核心模块重构思路

#### 1. 分离 `server.js` 与 `app.js`

- **`app.js`**:
  负责“打扮”应用。所有的 `app.use(express.json())`、`app.use(cors())` 和路由挂载都写在这里。它不负责启动，只负责配置。

- **`server.js`**:
  负责“启动”应用。引入 `app.js`，然后连接数据库并 `app.listen()`。

- **理由**：这种解耦方便未来进行**自动化集成测试**，因为测试时只需引入 `app.js` 而不需要真的启动端口。

#### 2. 路由与控制器解耦 (Routes vs Controllers)

- **Routes** 只管“谁在哪个路口进”：

```javascript
// routes/postRoutes.js
router.post('/', postController.createPost); // 极其简洁
```

- **Controllers** 只管“进了路口做什么”：

```javascript
// controllers/postController.js
exports.createPost = async (req, res) => {
  // 保存数据库的逻辑...
};
```

#### 3. 引入全局错误处理 (utils/catchAsync.js)

老师的 Demo 往往在每个 Async 函数里写一堆 `try-catch`。重构时，我们可以写一个包装函数，把报错自动扔给 Express 的全局错误处理器：

```javascript
// utils/catchAsync.js
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // 捕获异常并传给全局错误处理中间件
  };
};
```

## URL 重构

### 1. 你的 URL 现状与重构建议

我们可以把你现在的 URL 按照“资源”重新归类，你会发现逻辑瞬间变得清晰：

逻辑动作,最佳实践路径,HTTP 动词
注册, /api/users,POST
登录, /api/auth/login,POST
登出, /api/auth/logout,POST
获取当前状态, /api/users/me,GET
用户列表, /api/users,GET
单个用户,/api/users/:id,GET/PUT/DELETE

---

逻辑动作,路径设计,HTTP 动词
获取所有文章,/api/articles,GET
发布新文章,/api/articles,POST
获取单篇内容,/api/articles/:id,GET
修改文章,/api/articles/:id,PUT (或 PATCH)
删除文章,/api/articles/:id,DELETE

---

逻辑动作,最佳实践路径,HTTP 动词,说明
获取站点信息,/api/site,GET,获取网站名称、Logo、SEO 描述、备案号等
更新站点信息,/api/site,PUT,管理员修改站点全局配置
获取联系消息,/api/site/messages,GET,如果你有“联系我们”的留言功能
提交联系留言,/api/site/messages,POST,用户在前台提交咨询表单
