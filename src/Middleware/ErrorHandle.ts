import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "./AppError";
import responseMsg from "../Message";
const errorHandle = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = error.statusCode || 500;
    let message = error.message ? error.message : "Server error";

    if (error.name == "TokenExpiredError" || error.name == "JsonWebTokenError") {
        statusCode = 401;
        message = responseMsg.REQUIRE_TOKEN;
    }
    let status = String(statusCode).startsWith("4") ? "Fail" : "Error";
    res.status(statusCode).json({
        status: error.status,
        message: message,
    });
};

export default errorHandle;