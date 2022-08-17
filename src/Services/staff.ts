import dao from "../daos";
import { Staff } from "../entities";
import { IStaffCreatePayload, IStaffQueryAll } from "../models/staff";

export const checkEmailExist = async (
  email: string,
  id: string | null
): Promise<boolean> => {
  const result = await dao.Staff.findByEmail(email);
  if (result instanceof Error) {
    return false;
  }
  if (id) {
    if (result[0]?.id == id) return false;
    return true;
  }
  return true;
};

export const checkStaffExist = async (id: string): Promise<boolean> => {
  const result = await dao.Staff.findById(id);
  if (result instanceof Error) return false;
  return true;
};

export const create = async (
  payload: IStaffCreatePayload
): Promise<[Object | null, Error | null]> => {
  const isEmailExist = await checkEmailExist(payload.email,null);
  if (isEmailExist) return [null, new Error("Staff already existed")];

  const result = await dao.Staff.create(payload);
  if(result instanceof Error) return [null,result];
  return [result,null];
};

export const update = async (id: string, staff: IStaffCreatePayload): Promise<[Object | null, Error | null]> => {
  const isEmailExist = await checkEmailExist(staff.email,id);
  if(isEmailExist) return [null, new Error("Staff already existed")];
  
  const isStaffExist = await checkStaffExist(id);
  if(!isStaffExist) return [null, new Error("Staff not found")];

  const updateStaff = await dao.Staff.findById(id)
  if(updateStaff instanceof Error) return [null,updateStaff];
  const result = await dao.Staff.update(Object.assign(updateStaff,{...staff}))
  if(result instanceof Error) return [null, result]
  return [result,null];
};

export const findById = async (id: string): Promise<[Object | null , Error | null]> => {
  const result = await dao.Staff.findById(id);
  if (!result) return [null, result]
  return [result,null];
};

export const all = async (query: IStaffQueryAll): Promise<[Staff[], null]> => {
  query.limit = query.limit ? Math.floor(query.limit) : 20;
  query.keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
  const result = await dao.Staff.all(query);
  return [result,null]
};
