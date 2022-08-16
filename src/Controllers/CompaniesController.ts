import CompanyService from "../Services/CompaniesService";
import { ICreateCompany, IQueryCompany } from "../Models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class CompanyController {
    static createCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const company : ICreateCompany = req.body as ICreateCompany;
            const result = await CompanyService.createCompany(company);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static updateCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const company : ICreateCompany = req.body as ICreateCompany;
            const result = await CompanyService.updateCompany(company, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await CompanyService.findCompanyById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryCompany = req.query as never;
            const result = await CompanyService.getListCompany(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}