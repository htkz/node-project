const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 40400;

class ResourceNotFoundError extends HTTPBaseError {
  constructor(resourceName, resourceId, httpMsg) {
    super(404, httpMsg, ERROR_CODE, `not found, id: ${resourceId}`);
  }
}

module.exports = ResourceNotFoundError;
