import InventoryService from "../Services/InventoriesService";
import { ICreateInventory, IQueryInventory } from "../Models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class InventoryController {
    static createInventory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const inventory : ICreateInventory = req.body as ICreateInventory;
            const result = await InventoryService.createInventory(inventory);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static updateInventory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const inventory : ICreateInventory = req.body as ICreateInventory;
            const result = await InventoryService.updateInventory(inventory, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findInventoryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await InventoryService.findInventoryById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListInventory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryInventory = req.query as never;
            const result = await InventoryService.getListInventory(query);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}