import DrawerService from "../services/drawers";
import { ICreateDrawer, IQueryDrawer } from "../models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class DrawerController {
    static createDrawer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const drawer : ICreateDrawer = req.body as ICreateDrawer;
            const result = await DrawerService.createDrawer(drawer);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static updateDrawer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const drawer : ICreateDrawer = req.body as ICreateDrawer;
            const result = await DrawerService.updateDrawer(drawer, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findDrawerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DrawerService.findDrawerById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListDrawer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryDrawer = req.query as never;
            const result = await DrawerService.getListDrawer(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}