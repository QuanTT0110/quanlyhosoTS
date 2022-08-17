import dao from "../daos";
import { ICreateStaff, IQueryStaff } from "../Models/models";

export const isEmailExist = async (email: string) => {
    const result = await dao.Staff.findByEmail(email);
    if (!result) {
        return false;
    }
    return true;
};

export const create = async (staff: ICreateStaff) => {
    if (await isEmailExist(staff.name)) return {data:null,msg : new Error("Staff already existed")};
    return {data: await dao.Staff.create(staff),msg: null};
};

export const update = async (id: string, staff: ICreateStaff) => {
    const existedStaff = await findById(id);
    if (await isEmailExist(staff.name)) return {data:null,msg: new Error("Email of staff already existed")};
    return {data: await dao.Staff.update(Object.assign(existedStaff,staff)),msg:null};
};

export const findById = async (id: string) => {
    const data = await dao.Staff.findById(id);
    if (!data) return {data:null,msg: new Error("Staff not found")};
    return {data: data,msg:null};
};

export const getList = async (query: IQueryStaff) => {
    query.limit = query.limit ? Math.floor(query.limit) : 20;
    query.keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    return {data: await dao.Staff.getList(query)};
}
