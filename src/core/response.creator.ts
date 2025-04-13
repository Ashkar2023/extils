import { CookieOptions } from "express";
import { IResponse, IResponseCreator } from "../types/response";

export class ResponseCreator implements IResponseCreator {
    #statusCode: number;
    #message?: string | undefined;
    #body?: object | undefined;
    #headers: Map<string, string>
    #cookies: Map<string, {
        value: string,
        options?: CookieOptions
    }>

    constructor() {
        this.#statusCode = 200;
        this.#headers = new Map();
        this.#cookies = new Map();
    }

    setStatusCode(statusCode: number) {
        this.#statusCode = statusCode;
        return this;
    }

    setHeader(key: string, value: string) {
        this.#headers?.set(key, value);
        return this;
    }

    setCookie(name: string, value: string, options?: CookieOptions) {
        this.#cookies.set(name, {
            value,
            options
        })
        return this
    }

    setMessage(message: string) {
        this.#message = message;
        return this;
    }

    setData(body: object) {
        this.#body = body;
        return this;
    }

    get(): IResponse {
        return {
            statusCode: this.#statusCode,
            body: this.#body,
            headers: this.#headers,
            message: this.#message,
            cookies: this.#cookies
        }
    }
}