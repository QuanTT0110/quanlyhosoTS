import InventoryDAO from "../dao/inventories";
import { ICreateInventory, IQueryInventory } from "../models/models";
import responseMsg from "../Message";

export default class InventoryService {
    static createInventory = async (inventory: ICreateInventory) => {
        const result = await InventoryDAO.createInventory(inventory);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateInventory = async (inventory: ICreateInventory, id: string) => {
        const result = await InventoryDAO.updateInventory(inventory,id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static getListInventory = async (query: IQueryInventory) => {
        const result = await InventoryDAO.getListInventory(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static findInventoryById = async (id: string) => {
        const result = await InventoryDAO.findInventoryById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    }
}