import 'dotenv/config';

const config = {
  port: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  db: process.env.db,
  sessionSecret: process.env.sessionSecret,
  secretKey: process.env.secretKey,
};

export default config;
