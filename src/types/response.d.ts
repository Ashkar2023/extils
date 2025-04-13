import { CookieOptions } from "express";

export type IResponse = {
    statusCode: number,
    headers: Map<string, string>,
    cookies: Map<string, {
        value:string,
        options?: CookieOptions
    }>
    message?: string,
    body?: Object
}

export interface IResponseCreator{
    setStatusCode: (statusCode: number) => this;
    setHeader: (key: string, value: string) => this;
    setMessage: (message: string) => this;
    setData: (body: object) => this;
    setCookie: (name: string, value: string, options?: CookieOptions) => this
}