import { Request, Response, NextFunction } from "express";
import { check, validationResult, buildCheckFunction } from "express-validator";
import responseMsg from "../message";
import AppError from "../middleware/app-error";

const checkUUIDParamsAndRequest = buildCheckFunction([
  "params",
  "query",
  "body",
]);
const checkQuery = buildCheckFunction(["query"]);
const checkBody = buildCheckFunction(["body"]);

export const isUUID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkUUIDParamsAndRequest("id").isUUID().run(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};

export const createStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkBody(["name", "email", "password"]).notEmpty().run(req);
  await checkBody(["name", "email", "password"]).isString().run(req);

  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};

export const queryStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkQuery(["limit", "page"])
    .isNumeric()
    .optional({ nullable: true })
    .run(req);
  await checkQuery("keyword").isString().optional({ nullable: true }).run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
