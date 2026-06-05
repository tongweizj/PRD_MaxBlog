// 这个类专门用来创建“可预测”的业务错误
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // 标记这是一个业务错误，而非代码崩溃

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
