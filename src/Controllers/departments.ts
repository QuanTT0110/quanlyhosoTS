import DepartmentService from "../services/departments";
import { ICreateDepartment, IQueryDepartment } from "../models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class DepartmentController {
    static createDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const department : ICreateDepartment = req.body as ICreateDepartment;
            const result = await DepartmentService.createDepartment(department);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };
    
    static updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const department : ICreateDepartment = req.body as ICreateDepartment;
            const result = await DepartmentService.updateDepartment(department, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DepartmentService.findDepartmentById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryDepartment = req.query as never;
            const result = await DepartmentService.getListDepartment(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };


}