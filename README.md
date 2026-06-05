# My Portfolio React app

deploy

- github
  https://github.com/tongweizj/my-portfolio-react

- netlify
  https://frolicking-cobbler-f22a45.netlify.app/

## TODO

## v0.1
20260303 完成

Public Pages

- Home page
  - 显示用户的profile
  - 显示推荐文章
- blog
  - 文章列表页
  - 文章详情页

Admin Pages

- 站点设置
  - 增加profile 字段，支持markdown编辑
- 博客文章编辑功能，支持markdown

## v0.2

代码重构
详情请看 [v0.2](doc/v_02.md)

- [x] refactor express
- [ ] refactor react

## v0.3

Public Pages

- [] 文章支持slug
  - [] About Me page
  - [] Projects page
  - [] Services page
  - [] Contact Me
    Admin Pages

- 博客文章编辑功能，
  - 增加 slug

## TAsk

### **Home Page**

1. welcome message
2. link or button that allows the user to redirect to your About Me Page and / or other pages.
3. **Mission Statement.**

### **About Me Page**

1. legal name
2. an image of you (I recommend a head and shoulders shot),
3. a short paragraph about who you are.
4. Keep this clean and simple as it may be viewed by perspective employers.
5. Resume
   Your **About Me page** should include a link to a PDF version of your Resume.

### **Projects Page**

at least 3 Projects

- Include an image for each Project
- a short description of your role and the outcome.

### **Services Page**

- a short list of services you offer
  (e.g. general programming, web development, mobile apps, etc.).
- I recommend including images that make this more appealing to view.

### **Contact Page**

- contact information in a panel or other construct.
- a short interactive form
  that allows the user send you a message
  and provide basic contact information (First Name, Last Name, Contact Number, Email Address, Message, etc.).
  This form does not have to be fully functional initially.
  However, it should be able to capture the information entered by the user and redirect them back to the Home Page.

## 代码要求

1. 各种文件在浏览器里面没有死链
   **JavaScript**, **CSS and Multimedia Asset Files** are functional.

2. All Your Code (HTML, CSS, JavaScript, jQuery, etc.) is error free.

3. Include **Internal Documentation** for your site **(5 Marks: Internal Documentation):**
   为您的网站添加**内部文档**

4. 文件中的身份说明

- Ensure you include a **comment header** for your **CSS and JavaScript files** that indicate: the
  **File name**, **Student’s Name**, **StudentID, and Date.**

- Ensure you include a **section headers** for all of your **HTML structure, CSS style sections,**
  and any **JavaScript functions.**

- Ensure all your code uses **contextual variable names** that help make the files human- readable.

## 部署

1. Share your files on **GitHub** to demonstrate Version Control Best Practices

- Your repository must include **your code** and be well structured.
- Your repository must include **commits** that demonstrate the project being updated at different stages of development – each time a major change is implemented.
  您的存储库必须包含**提交**，以证明项目在开发的不同阶段得到更新——每次实施重大更改时。

2. push your site to a cloud host
   You must deploy your site to your Cloud Server using **git**

## URL

未注册用户可访问页面

3. 首页,`/`
   展示精选内容、最新动态或欢迎语

4. 文章列表页,`/posts`,
   所有的博文列表（通常带分页）

5. 文章详情页,`/posts/:id` 或 `/p/:slug`
   使用文章 ID 或 标题别名（Slug）访问具体内容

6. 关于我,`/about`,
   个人介绍、联系方式等静态信息

作者可访问页面

1. 登录,`/login`
   ,用户身份验证入口

2. 注册,`/register`
   ,新用户创建账号

3. 我的文章列表,`/admin/posts`,
   作者查看自己发布的所有文章，带编辑/删除按钮

4. 添加文章,`/admin/post/create`
   ,创作新内容的空白编辑器页面

5. 编辑文章,`/admin/posts/edit/:id`
   ,根据文章 ID 加载现有内容进行修改

6. 我的 Profile,`/admin/profile`
   ,个人资料设置（修改头像、简介、密码等）
