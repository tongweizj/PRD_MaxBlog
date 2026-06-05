import mongoose from 'mongoose';

const { Schema } = mongoose;

// 使用 const 定义 Schema，将变量名改为 SiteSchema（更语义化）
const SiteSchema = new Schema({
  blogname: String,
  blogdescription: String,
  profile: String,
  project: String,
});

// 配置 Schema
SiteSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

// 注册模型
const Site = mongoose.model('Site', SiteSchema);

// 建议显式导出模型
export default Site;
