import StaffDAO from "../dao/staffs";
import { ICreateStaff, IQueryStaff } from "../models/models";
import responseMsg from "../Message";

export default class StaffService {
    static createStaff = async (staff: ICreateStaff) => {
        const oldStaff = await StaffDAO.findStaffByEmail(staff.email);
        if(oldStaff) return { data: null, message: responseMsg.ALREADY_EXIST };
        const result = await StaffDAO.createStaff(staff);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateStaff = async (staff: ICreateStaff, id: string) => {
        const result = await StaffDAO.updateStaff(staff,id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static changeActive = async (id: string) => {
        const result = await StaffDAO.changeActive(id);
        if(!result) return { data: null, message: responseMsg.UPDATE_STATUS_ERROR};
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static findStaffById = async (id: string) => {
        const result = await StaffDAO.findStaffById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static getListStaff = async (query: IQueryStaff) => {
        const result = await StaffDAO.getListStaff(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    }
}