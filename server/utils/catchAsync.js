/**
 * catchAsync 的作用是包装异步函数
 * 它捕获异步操作中抛出的错误，并将其传递给 Express 的 next() 函数
 * 从而触发全局错误处理中间件
 */
export default (fn) => {
  return (req, res, next) => {
    // 确保 fn(req, res, next) 返回的是一个 Promise
    // 如果报错，.catch(next) 等同于 .catch(err => next(err))
    fn(req, res, next).catch(next);
  };
};
