export class AppError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }

  static badRequest(msg = "Bad request", details?: unknown) {
    return new AppError(400, msg, details);
  }

  static unauthorized(msg = "Unauthorized", details?: unknown) {
    return new AppError(401, msg, details);
  }

  static notFound(msg = "Not found", details?: unknown) {
    return new AppError(404, msg, details);
  }

  static conflict(msg = "Conflict", details?: unknown) {
    return new AppError(404, msg, details);
  }

  static internalServerError(msg = "Internal server error", details?: unknown) {
    return new AppError(500, msg, details);
  }
}
