import { CookieOptions, Request, NextFunction, RequestHandler, Response } from 'express';

type IResponse = {
    statusCode: number;
    headers: Map<string, string>;
    cookies: Map<string, {
        value: string;
        options?: CookieOptions;
    }>;
    message?: string;
    body?: Object;
};
interface IResponseCreator {
    setStatusCode: (statusCode: number) => this;
    setHeader: (key: string, value: string) => this;
    setMessage: (message: string) => this;
    setData: (body: object) => this;
    setCookie: (name: string, value: string, options?: CookieOptions) => this;
}

type ControllerFunc = (req: Request, next: NextFunction) => Promise<IResponse | never>;
declare function createCallback(controller: ControllerFunc): RequestHandler;

declare const validateEnv: (envObj: {
    [key: string]: string;
}, serviceName: string) => void;

/**
 * @class AppError
 * @description Base class for all application-specific errors.
 * @extends {Error}
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {Record<string, any>} [body] - Optional additional details in the error response.
 * @param {string} [error] - Optional error type identifier.
 */
declare class AppError extends Error {
    statusCode: number;
    body?: Record<string, any> | undefined;
    error?: string | undefined;
    constructor(message: string, statusCode: number, body?: Record<string, any> | undefined, error?: string | undefined);
}
/**
 * @class BadRequestError
 * @description Represents a 400 Bad Request error.
 * @extends {AppError}
 * @param {string} [message="Bad request"] - The error message.
 * @param {number} [statusCode=400] - The HTTP status code (400 - Bad Request).
 */
declare class BadRequestError extends AppError {
    constructor(message?: string, statusCode?: number, error?: "banned");
}
/**
 * @class ConflictError
 * @description Represents a 409 Conflict error.
 * @extends {AppError}
 * @param {string} [message="Conflict error"] - The error message.
 * @param {number} [statusCode=409] - The HTTP status code (409 - Conflict).
 */
declare class ConflictError extends AppError {
    constructor(message?: string, statusCode?: number);
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
declare class UnauthorizedError extends AppError {
    constructor(message?: string, statusCode?: number, body?: Record<string, any>, error?: string);
}
/**
 * @class TokenError
 * @description Represents a 401 Token-related error.
 * @extends {AppError}
 * @param {string} message - The error message.
 * @param {number} [statusCode=401] - The HTTP status code (401 - Unauthorized).
 * @param {"invalid_access" | "invalid_refresh"} error - The type of token error.
 */
declare class TokenError<T extends string> extends AppError {
    error: T;
    constructor(message: string, statusCode: number | undefined, error: T);
}
/**
 * @class InternalServerError
 * @description Represents a 500 Internal Server error.
 * @extends {AppError}
 * @param {string} [message="Internal Server error"] - The error message.
 * @param {number} [statusCode=500] - The HTTP status code (500 - Internal Server Error).
 */
declare class InternalServerError extends AppError {
    constructor(message?: string, statusCode?: number);
}
/**
 * @class ValidationError
 * @extends AppError
 * @description Represents a 400 Input Validation Error.
 * @param {string} [message="Input Validation Error"] - The error message.
 * @param {number} [statusCode=400] - The HTTP status code (400 - Bad Request).
 */
declare class ValidationError extends AppError {
    constructor(message?: string, statusCode?: number);
}
declare class DatabaseOpError extends AppError {
    constructor(message?: string, statusCode?: number);
}
/**
 * Represents an error that occurs when an expected environment variable is not found or has an invalid value.
 *
 * @extends {Error}
 */
declare class EnvNotFoundError extends Error {
    /**
     * Creates an instance of EnvNotFoundError.
     *
     * @param {string} key - The key of the environment variable that was not found or has an invalid value.
     * @param {string} service - The name of the service that requires the environment variable.
     */
    constructor(key: string, service: string);
}

declare function globalErrorHadler(err: Error, req: Request, res: Response, next: NextFunction): void;
type IGlobalErrorHandler = typeof globalErrorHadler;

declare class ResponseCreator implements IResponseCreator {
    #private;
    constructor();
    setStatusCode(statusCode: number): this;
    setHeader(key: string, value: string): this;
    setCookie(name: string, value: string, options?: CookieOptions): this;
    setMessage(message: string): this;
    setData(body: object): this;
    get(): {
        statusCode: number;
        body: object | undefined;
        headers: Map<string, string>;
        message: string | undefined;
    };
}

export { AppError, BadRequestError, ConflictError, DatabaseOpError, EnvNotFoundError, type IGlobalErrorHandler, InternalServerError, ResponseCreator, TokenError, UnauthorizedError, ValidationError, createCallback, globalErrorHadler, validateEnv };
