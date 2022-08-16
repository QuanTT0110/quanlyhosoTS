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

export const isUUID = async (req: Request, res: Response, next: NextFunction) => {
    await checkUUIDParamsAndRequest("id").isUUID().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new AppError(403, responseMsg.INVALID_INPUT);
        return next(error);
    }
    next();
};

export const createDrawer = async (req: Request, res: Response, next: NextFunction) => {
    await checkBody(["name", "cabinetId"]).notEmpty().run(req);
    await checkBody("name").isString().run(req);
    await checkBody("cabinetId").isUUID().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result);
      const error = new AppError(403, responseMsg.INVALID_INPUT);
      return next(error);
    }
    next();
  };
  export const queryDrawer = async (req: Request, res: Response, next: NextFunction) => {
    await checkQuery(["limit", "page"])
      .isNumeric()
      .optional({ nullable: true })
      .run(req);
    await checkQuery(["keyword", "typeCompany"])
      .isString()
      .optional({ nullable: true })
      .run(req);
    await checkQuery("cabinetId").isUUID().optional({ nullable: true }).run(req);
    const rs = validationResult(req);
    if (!rs.isEmpty()) {
      const error = new AppError(403, responseMsg.INVALID_INPUT);
      return next(error);
    }
    next();
  };