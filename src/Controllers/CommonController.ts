import { Staff } from "../Entities/Index";
import { ILogin } from "../Models/models";
import CommonService from "../Services/CommonService";
import * as response from "../Response"
import { NextFunction, Request, Response } from "express";

export default class CommonController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const login: ILogin = req.body as ILogin;
            const result = await CommonService.login(login);
            if (!result.data) return response.r400(res, result.message);
            return response.r200(res, result.data, result.message);
        } catch (error) {
            next(error)
        }
    };

    static getStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user: Staff = res.locals.auth as never;
          const result = await CommonService.getStaff(user);
          if (!result.data) return response.r400(res, result.message);
          return response.r200(res, result.data, result.message);
        } catch (error) {
          next(error);
        }
      };
}
