// Load the module dependencies:
//  config.js module and mongoose module
import config from './index.js';
import mongoose from 'mongoose';

import User from '../models/User.js';
import '../models/Article.js';
import '../models/Site.js';

// Define the Mongoose configuration method
export default function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('DB Connected!');
      // 关键：连接成功后执行初始化检查
      seedSiteData();
    })
    .catch((err) => {
      console.log('Error');
    });

  // 3. 定义初始化函数
  async function seedSiteData() {
    try {
      const Site = mongoose.model('Site');
      // 🌟 修复：确保 Article 模型也被正确加载
      const Article = mongoose.model('Article');

      const count = await Site.countDocuments();

      if (count === 0) {
        console.log('--- 正在初始化默认站点数据 ---');
        // 1. 创建默认 Site 记录
        const defaultSite = new Site({
          blogname: '我的博客',
          blogdescription: '这是一个使用 Node.js、Express 和 MongoDB 构建的博客系统。',
          profile: '欢迎来到我的博客！这里是默认的个人简介。',
          project: '这是默认的项目列表描述。',
        });
        await defaultSite.save();

        // 2. 创建默认用户
        const defaultAdmin = new User({
          username: 'admin',
          password: 'password',
          nickName: '超级管理员',
          email: 'admin@example.com'
        });
        // 保存后，defaultAdmin._id 已经自动存在了
        await defaultAdmin.save();

        // 🌟 修复点 1：删除报错的 const 重新赋值这一行
        // 🌟 修复点 2：直接使用 defaultAdmin._id，并修正拼写错误 (_id 是 Mongoose 的标准属性)
        const creatorId = defaultAdmin ? defaultAdmin._id : null;

        // 3. 构造默认文章数据
        const defaultArticle = new Article({
          title: '欢迎使用我的博客系统！',
          content: '# 嗨！这是你的第一篇文章\n\n如果你看到了这个内容，说明你的博客系统、后台管理以及数据库已经成功对接并顺利运转了！\n\n现在你可以登录后台去：\n1. 删除或修改这篇默认文章\n2. 撰写并发布你的新大作\n3. 调整发布日期或管理自定义 Slug\n\n祝写作愉快！',
          slug: 'welcome-to-my-blog',
          status: 'published',
          creator: creatorId,
          created: new Date(),
        });

        // 4. 保存文章到数据库
        await defaultArticle.save();

        console.log('✅ 默认 Site、User 和 Article 记录创建成功！');
      } else {
        console.log('ℹ️ Site 数据已存在，无需初始化。');
      }
    } catch (err) {
      console.error('❌ 初始化 Site 数据失败:', err);
    }
  }
  return db;
}
