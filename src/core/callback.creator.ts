import { IResponse } from "../interfaces/response.interface";
import { NextFunction, Request, RequestHandler, Response } from "express";

type ControllerFunc = (req: Request, next: NextFunction) => Promise<IResponse | never>;

export function createCallback(controller: ControllerFunc): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = (await controller(req, next));

            response.cookies.forEach((val, key) => {
                res.cookie(key, val.value, val.options ?? {})
            });

            res.status(response.statusCode)
                .setHeaders(response.headers)
                .json({
                    success: true,
                    body: response.body,
                    message: response.message
                })

        } catch (error) {
            if (process.env.NODE_ENV === "dev") {
                console.log("error from createCallback :", error);
            }

            next(error);
        }
    }
}