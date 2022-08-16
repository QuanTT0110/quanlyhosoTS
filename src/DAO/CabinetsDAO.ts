import { Cabinet } from "../Entities/Index";
import { ICreateCabinet, IQueryCabinet } from "../Models/models";
import { AppDataSource } from "../data-source";
import InventoryDAO from "./InventoriesDAO";

const cabinetDAO = AppDataSource.getRepository(Cabinet);

export default class CabinetDAO {
    static findCabinetById = async (id: string): Promise<Cabinet | null> => {
        const result = await cabinetDAO.findOne({
            where: { id: id },
            relations: { inventory: true },
        });
        if (!result) return null;
        return result;
    };

    static getListCabinet = async (query: IQueryCabinet): Promise<Cabinet[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = await cabinetDAO.createQueryBuilder().innerJoinAndSelect("Cabinet.inventory", "Inventory").where("Cabinet.name LIKE :name", { name: keyword });
        if (query.inventoryId) {
            await queryString.andWhere("Inventory.id = :id", { id: query.inventoryId });
        }
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static createCabinet = async (cabinet: ICreateCabinet): Promise<Cabinet | null> => {
        const inventory = await InventoryDAO.findInventoryById(cabinet.inventoryId);
        if (!inventory) return null;
        const createCabinet = await cabinetDAO.save(cabinetDAO.create({...cabinet,inventory}));
        return createCabinet;
    };

    static updateCabinet = async (cabinet: ICreateCabinet, id: string): Promise<Cabinet | null> => {
        const inventory = await InventoryDAO.findInventoryById(cabinet.inventoryId);
        const updateCabinet = await cabinetDAO.findOneBy({id});
        if(!updateCabinet || !inventory) return null
        return await cabinetDAO.save(Object.assign(updateCabinet,{...cabinet,inventory: inventory}))
    };
}
