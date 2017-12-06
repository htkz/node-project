class HTTPBaseError extends Error {
  constructor(httpStatusCode, httpMsg, errCode, msg) {
    super(`HTTP ERROR: ${msg}`);
    this.httpStutusCode = httpStatusCode;
    this.httpMsg = httpMsg;
    this.errCode = errCode;
    this.msg = msg;
  }
}

module.exports = HTTPBaseError;

throw new HTTPBaseError(404, '资源不存在', 1000, 'resource not found!')