const HTTPBaseError = require('./http_server_error');

const ERROR_CODE = 40000;

class HTTPReqParamError extends HTTPBaseError {
  constructor(paramName, desc, msg) {
    super(200, desc, ERROR_CODE, `${paramName} wrong: ${msg}`);
  }
}

module.exports = HTTPReqParamError;
