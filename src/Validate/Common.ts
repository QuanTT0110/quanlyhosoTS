import { Request, Response, NextFunction } from "express";
import { check, validationResult, buildCheckFunction } from "express-validator";
import responseMsg from "../Message";
import AppError from "../Middleware/AppError";

const checkUUIDParamsAndRequest = buildCheckFunction([
    "body",
    "query",
    "params",
]);

const checkQuery = buildCheckFunction(["query"]);
const checkBody = buildCheckFunction(["body"]);

export const login = async (req: Request, res: Response, next: NextFunction) => {
    await checkBody(["email", "password"]).notEmpty().isString().run(req);
    const result = validationResult(req);
    if(!result.isEmpty()) {
        const error = new AppError(403,responseMsg.INVALID_INPUT);
        return next(error)
    }
    next();
}