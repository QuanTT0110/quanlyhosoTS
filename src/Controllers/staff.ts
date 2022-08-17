import services from "../services";
import { IStaffCreatePayload, IStaffQueryAll } from "../models/staff";
import { Request, Response } from "express";
import response from "../response";

export const create = async (req: Request, res: Response) => {
  const staff: IStaffCreatePayload = req.body as IStaffCreatePayload;
  const [data,error] = await services.Staff.create(staff);
  if (error) {
    return response.r404(res,error.message);
  }
  return response.r200(res, data);
};

export const update = async (req: Request, res: Response) => {
  const staff: IStaffCreatePayload = req.body as IStaffCreatePayload;
  const [data,error] = await services.Staff.update(req.params.id, staff);
  if (error) {
    return response.r404(res,error.message);
  }
  return response.r200(res, data);
};

export const findById = async (req: Request, res: Response) => {
  const [data,error] = await services.Staff.findById(req.params.id);
  if (error) {
    return response.r404(res,error.message);
  }
  return response.r200(res, data);
};

export const all = async (req: Request, res: Response) => {
  const query: IStaffQueryAll = req.query as never;
  const data = await services.Staff.all(query);
  return response.r200(res, data);
};
