import services from "../Services";
import { ICreateStaff, IQueryStaff } from "../Models/models";
import { Request, Response } from "express";
import * as response from "../Response"

export const create = async (req: Request, res: Response) => {
    const staff : ICreateStaff = req.body as ICreateStaff;
    const {data,msg} = await services.Staff.create(staff);
    if (msg) {
        return response.r404(res);
      }
      return response.r200(res, data);
};

export const update = async (req: Request, res: Response) => {
    const staff : ICreateStaff = req.body as ICreateStaff;
    const {data,msg} = await services.Staff.update(req.params.id,staff);
    if (msg) {
        return response.r404(res);
      }
      return response.r200(res, data);
};

export const findById = async (req: Request, res: Response) => {
    const {data,msg} = await services.Staff.findById(req.params.id);
    if (msg) {
        return response.r404(res);
      }
      return response.r200(res, data);
    
};

export const getList = async (req: Request, res: Response) => {
    const query: IQueryStaff = req.query as never;
    const data = await services.Staff.getList(query);
    return response.r200(res, data);
};
