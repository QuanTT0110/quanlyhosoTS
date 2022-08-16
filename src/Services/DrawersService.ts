import { ICreateDrawer, IQueryDrawer } from "../Models/models";
import DrawerDAO from "../DAO/DrawersDAO";
import responseMsg from "../Message";

export default class DrawerService {
    static createDrawer = async (drawer: ICreateDrawer) => {
        const result = await DrawerDAO.createDrawer(drawer)
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateDrawer = async (drawer: ICreateDrawer, id: string) => {
        const result = await DrawerDAO.updateDrawer(drawer, id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static findDrawerById = async (id: string) => {
        const result = await DrawerDAO.findDrawerById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static getListDrawer = async (query: IQueryDrawer) => {
        const result = await DrawerDAO.getListDrawer(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    }
}