import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true,
  },
  password: {
    type: String,
    required: 'Password is required',
    validate: [(password) => password && password.length > 6, 'Password should be longer'],
  },
  nickName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
});

// 关键修复：使用 pre-save 中间件处理密码
UserSchema.pre('save', function (next) {
  // 只有在密码被修改或新创建时才进行加密
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // 虽然 hashSync 可以，但 ES6 环境建议习惯使用异步
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 关键修复：验证方法
UserSchema.methods.authenticate = function (password) {
  // 使用 compareSync 直接对比明文和哈希值
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

// 注册并导出模型
const User = mongoose.model('User', UserSchema);
export default User;
