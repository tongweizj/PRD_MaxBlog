// Load the module dependencies:
//  config.js module and mongoose module
import config from './index.js';
import mongoose from 'mongoose';

import '../models/User.js';
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
      const count = await Site.countDocuments();

      if (count === 0) {
        console.log('--- 正在初始化默认站点数据 ---');
        const defaultSite = new Site({
          profile: '欢迎来到我的博客！这里是默认的个人简介。',
          project: '这是默认的项目列表描述。',
        });
        await defaultSite.save();
        console.log('✅ 默认 Site 记录创建成功！');
      } else {
        console.log('ℹ️ Site 数据已存在，无需初始化。');
      }
    } catch (err) {
      console.error('❌ 初始化 Site 数据失败:', err);
    }
  }
  return db;
}
