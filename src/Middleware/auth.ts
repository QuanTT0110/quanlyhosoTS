import { NextFunction, Request, Response } from "express";
import response from "../response";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import Services from "../services";
import { Staff } from "../entities";
import responseMsg from "../message";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers["authorization"];

  if (!token) return response.r401(res, responseMsg.REQUIRE_TOKEN);

  try {
    const decoded = <Staff>await jwt.verify(token, config.jwtSecret);
    const staff = (await Services.Staff.findById(decoded.id)).data;

    if (!staff) return response.r401(res, responseMsg.NOT_EXIST);
    res.locals.auth = staff;

    next();
  } catch (error) {
    next(error);
  }
};
