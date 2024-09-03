class ApiError extends Error {
  constructor(statuscode, message, data = null, success = false) {
    super(message);
    this.status = statuscode;
    this.data = data;
    this.success = success;
  }
}

module.exports = ApiError;
