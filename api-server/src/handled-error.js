// Source: https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216

class HandledError extends Error {
  constructor (message, status) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // You can use any additional properties you want.
    this.status = status || 400;
  }
};

module.exports = HandledError;