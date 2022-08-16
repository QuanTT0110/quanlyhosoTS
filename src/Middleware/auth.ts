import { NextFunction, Request, Response } from "express";
import * as response from "../Response";
import config from "../Config/config";
import * as jwt from "jsonwebtoken";
import StaffService from "../Services/StaffsService";
import { Staff } from "../Entities/Index";
import responseMsg from "../Message";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token : string | any = req.headers["authorization"];
    if(!token) return response.r401(res, responseMsg.REQUIRE_TOKEN);
    try {
        const decoded = <Staff> await jwt.verify(token, config.jwtSecret);
        const staff = (await StaffService.findStaffById(decoded.id)).data;
        if(!staff) return response.r401(res, responseMsg.NOT_EXIST);
        if(!staff.isRoot) {
            if(!staff.active) return response.r401(res, responseMsg.ACCOUNT_IS_DISABLE);
        }
        res.locals.auth = staff;
        next();
    } catch (error) {
        next(error);
    }
} 