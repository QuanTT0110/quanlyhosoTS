import CabinetService from "../Services/CabinetsService";
import { ICreateCabinet, IQueryCabinet } from "../Models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class CabinetController {
    static createCabinet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const cabinet : ICreateCabinet = req.body as ICreateCabinet;
            const result = await CabinetService.createCabinet(cabinet);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static updateCabinet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const cabinet : ICreateCabinet = req.body as ICreateCabinet;
            const result = await CabinetService.updateCabinet(cabinet, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findCabinetById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await CabinetService.findCabinetById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListCabinet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryCabinet = req.query as never;
            const result = await CabinetService.getListCabinet(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}