import CabinetDAO from "../DAO/CabinetsDAO";
import { ICreateCabinet, IQueryCabinet } from "../Models/models";
import responseMsg from "../Message";

export default class CabinetService {
    static createCabinet = async (cabinet: ICreateCabinet) => {
        const result = await CabinetDAO.createCabinet(cabinet);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateCabinet = async (cabinet: ICreateCabinet, id: string) => {
        const result = await CabinetDAO.updateCabinet(cabinet,id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static getListCabinet = async (query: IQueryCabinet) => {
        const result = await CabinetDAO.getListCabinet(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static findCabinetById = async (id: string) => {
        const result = await CabinetDAO.findCabinetById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    }
}