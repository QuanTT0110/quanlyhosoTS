import DepartmentDAO from "../dao/departments";
import { ICreateDepartment, IQueryDepartment } from "../models/models";
import responseMsg from "../Message";

export default class DepartmentService {
    static createDepartment = async (department: ICreateDepartment) => {
        const result = await DepartmentDAO.createDepartment(department);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateDepartment = async (department: ICreateDepartment, id: string) => {
        const result = await DepartmentDAO.updateDepartment(department, id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static findDepartmentById = async (id: string) => {
        const result = await DepartmentDAO.findDepartmentById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND };
        return { data: result, message: responseMsg.SUCCESS };
    };

    static getListDepartment = async (query : IQueryDepartment) => {
        const result = await DepartmentDAO.getListDepartment(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND };
        return { data: result, message: responseMsg.SUCCESS };
    }
}