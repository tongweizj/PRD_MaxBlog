import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank',
  },
  content: {
    type: String,
    default: '',
    trim: true,
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  slug: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
});

// 注册并导出模型
const Article = mongoose.model('Article', ArticleSchema);
export default Article;
