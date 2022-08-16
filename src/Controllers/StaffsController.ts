import StaffService from "../Services/StaffsService";
import { ICreateStaff, IQueryStaff } from "../Models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class StaffController {
    static createStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const department : ICreateStaff = req.body as ICreateStaff;
            const result = await StaffService.createStaff(department);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };
    
    static updateStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const staff : ICreateStaff = req.body as ICreateStaff;
            const result = await StaffService.updateStaff(staff, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findStaffById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await StaffService.findStaffById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryStaff = req.query as never;
            const result = await StaffService.getListStaff(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static changeActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const result = await StaffService.changeActive(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}