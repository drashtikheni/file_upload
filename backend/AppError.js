class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// throw new AppError(FORM_MESSAGES.uniqueQuestions, HTTP_STATUSES.BAD_REQUEST);
