/**
 * @class AppError
 * @description Base class for all application-specific errors.
 * @extends {Error}
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {Record<string, any>} [body] - Optional additional details in the error response.
 * @param {string} [error] - Optional error type identifier.
 */
export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public body?: Record<string, any>,
        public error?: string,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.body = body;
        this.error = error;
    }
}

/**
 * @class BadRequestError
 * @description Represents a 400 Bad Request error.
 * @extends {AppError}
 * @param {string} [message="Bad request"] - The error message.
 * @param {number} [statusCode=400] - The HTTP status code (400 - Bad Request).
 */
export class BadRequestError extends AppError {
    constructor(message: string = "Bad request", statusCode: number = 400, error?: "banned") {
        super(message, statusCode, {}, error);
    }
}

/**
 * @class ConflictError
 * @description Represents a 409 Conflict error.
 * @extends {AppError}
 * @param {string} [message="Conflict error"] - The error message.
 * @param {number} [statusCode=409] - The HTTP status code (409 - Conflict).
 */
export class ConflictError extends AppError {
    constructor(message: string = "Conflict error", statusCode = 409) {
        super(message, statusCode);
    }
}

/**
 * @class UnauthorizedError
 * @description Represents a 401 Unauthorized error.
 * @extends {AppError}
 * @param {string} [message="Unauthorized access"] - The error message.
 * @param {number} [statusCode=401] - The HTTP status code (401 - Unauthorized).
 * @param {Record<string, any>} [body] - Optional additional details in the error response.
 * @param {string} [error] - Optional error type identifier.
 */
export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized access", statusCode = 401, body?: Record<string, any>, error?: string) {
        super(message, statusCode, body, error);
    }
}


/**
 * @class TokenError
 * @description Represents a 401 Token-related error.
 * @extends {AppError}
 * @param {string} message - The error message.
 * @param {number} [statusCode=401] - The HTTP status code (401 - Unauthorized).
 * @param {"invalid_access" | "invalid_refresh"} error - The type of token error.
 */
export class TokenError<T extends string> extends AppError {
    constructor(
        message: string,
        statusCode: number = 401,
        public error: T
    ) {
        super(message, statusCode, undefined, error);
        this.error = error;
    }
}

/**
 * @class InternalServerError
 * @description Represents a 500 Internal Server error.
 * @extends {AppError}
 * @param {string} [message="Internal Server error"] - The error message.
 * @param {number} [statusCode=500] - The HTTP status code (500 - Internal Server Error).
 */
export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server error", statusCode: number = 500) {
        super(message, statusCode);
    }
}

/**
 * @class ValidationError
 * @extends AppError
 * @description Represents a 400 Input Validation Error.
 * @param {string} [message="Input Validation Error"] - The error message.
 * @param {number} [statusCode=400] - The HTTP status code (400 - Bad Request).
 */
export class ValidationError extends AppError {
    constructor(message: string = "Input Validation Error", statusCode: number = 400) {
        super(message, statusCode);
    }
}


export class DatabaseOpError extends AppError {
    constructor(message: string = "Database Operation Error", statusCode: number = 503) {
        super(message, statusCode);
    }
}


/**
 * Represents an error that occurs when an expected environment variable is not found or has an invalid value.
 * 
 * @extends {Error}
 */
export class EnvNotFoundError extends Error {
    /**
     * Creates an instance of EnvNotFoundError.
     * 
     * @param {string} key - The key of the environment variable that was not found or has an invalid value.
     * @param {string} service - The name of the service that requires the environment variable.
     */
    constructor(key: string, service: string) {
        super(`key ${key} has invalid ENV value from ${service}`);
    }
}