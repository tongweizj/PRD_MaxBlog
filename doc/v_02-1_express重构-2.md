### 🚀 TODO

- [ ] 引入全局错误处理
- [ ] 全部改用 catchAsync
- [ ] 统一 api 返回数据格式

从你提供的四个 Controller 脚本来看，目前最大的重构点在于**代码风格不统一**：有的使用了你新编写的 `catchAsync` 和 `AppError`（如 `usersController`），而有的还留着旧的 `try-catch` 和手动 `res.status(400).send`（如 `articlesController` 和 `siteController`）。

为了实现真正的 MVC 现代化，建议从以下几个维度进行深度重构：

## 统一 api 返回数据格式

```JSON
{
"code": 200, // 业务状态码（注意：不同于 HTTP 状态码）
"message": "success", // 提示信息，便于前端直接弹窗显示
"data": { // 核心业务数据，可以是对象或数组
"id": 1,
"username": "Gemini",
"email": "ai@google.com"
},
"timestamp": 1715600000 // 可选：服务器时间戳，方便排查时区或缓存问题
}
```

### 1. 统一异步错误处理 (`catchAsync`)

目前 `articlesController.js` 和 `authController.js` 中充斥着大量的 `try-catch`。你应该移除它们，改用 `catchAsync` 包装函数，这样报错会自动流向 `app.js` 中的全局错误处理中间件。

---

### 2. 移除冗余的错误消息解析 (`getErrorMessage`)

你在 `usersController` 和 `articlesController` 中都定义了 `getErrorMessage`。这违反了 **DRY (Don't Repeat Yourself)** 原则。

- **重构建议**：删除 Controller 里的这些私有函数。
- **做法**：在全局错误处理中间件里，针对 Mongoose 的 `ValidationError` 或 `11000` (重复键) 统一处理。

---

### 3. 具体脚本重构建议

#### **A. `authController.js`：业务逻辑分离**

目前登录成功后直接在 Controller 里操作 Cookie 并发送响应。

- **改进点**：登录成功后的逻辑不应该直接写死 `res.send({ screen: user.username })`。这太依赖于旧前端逻辑。
- **建议**：返回标准的 JSON 格式，让前端决定如何跳转。

#### **B. `articlesController.js`：彻底 MVC 化**

这个文件目前最“老旧”，手动处理了大量的 `res.status(400)`。

```javascript
// 重构示例：
export const create = catchAsync(async (req, res, next) => {
  const { title, content, slug, status, username } = req.body;

  const user = await User.findOne({ username });
  if (!user) return next(new AppError('User not found', 404));

  const article = await Article.create({
    title,
    content,
    slug: slug || `post-${Date.now()}`,
    status,
    creator: user._id,
  });

  res.status(201).json({ status: 'success', data: article });
});
```

#### **C. `usersController.js`：清理已注释代码**

文件里留下了大量 `//` 注释掉的旧逻辑（如 `welcome` 和 `requiresLogin`）。

- **建议**：既然已经迁移到了 `authMiddleware.js`，请彻底删除这些死代码，保持文件整洁。

---

### 4. 核心逻辑重构：`userByID` 和 `articleByID`

你现在的 `articleByID` 在找不到文章时抛出了一个原生 `Error`：
`if (!article) return next(new Error('Failed to load article ' + id));`

- **改进**：改为 `return next(new AppError('该文章不存在', 404));`。
- **收益**：这样前端收到的 HTTP 状态码就是准确的 **404**，而不是模糊的 **500**。

---

### 📊 重构对照表

| 重构项       | 旧做法                                     | 新做法 (最佳实践)                               |
| ------------ | ------------------------------------------ | ----------------------------------------------- |
| **异步处理** | `try { ... } catch(e) { next(e) }`         | `catchAsync(async (req, res, next) => { ... })` |
| **错误抛出** | `res.status(400).send({ message: '...' })` | `return next(new AppError('...', 400))`         |
| **数据填充** | 手动查用户 ID 并赋值                       | 统一从 `req.userId` (由 `protect` 提供) 取值    |
| **响应格式** | 混合使用 `.send()` 和 `.json()`            | 统一使用 `.status(xxx).json({ status, data })`  |

---

### 🚀 你的下一步建议

针对你之前的报错 `Error: Route.post() requires a callback function but got a [object Undefined]`：

检查 `articlesController.js` 的导出方式。如果你在 `articleRoutes.js` 里写的是 `import { create, ... }`，但你在 `articlesController.js` 里如果不小心写成了 `const create = ...` 而忘了前面的 `export` 关键字，就会报错。

**你想让我帮你把最复杂的 `articlesController.js` 按照 `AppError` 和 `catchAsync` 的标准彻底重写一遍吗？重写后的代码量会减少 40% 且更易读。**
