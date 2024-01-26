class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
