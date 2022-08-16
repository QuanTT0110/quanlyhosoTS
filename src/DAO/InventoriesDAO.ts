import { Inventory } from "../Entities/Index";
import { ICreateInventory, IQueryInventory } from "../Models/models";
import { AppDataSource } from "../data-source";
import CompanyDAO from "./CompaniesDAO";

const inventoryDAO = AppDataSource.getRepository(Inventory);

export default class InventoryDAO {
    static findInventoryById = async (id: string): Promise<Inventory | null> => {
        const result = inventoryDAO.findOne({
            where: { id: id },
            relations: { company: true }
        });
        if (!result) return null;
        return result;
    };

    static getListInventory = async (query: IQueryInventory): Promise<Inventory[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = inventoryDAO.createQueryBuilder().innerJoinAndSelect("Inventory.company", "Company").where("Inventory.name LIKE :name",{name: keyword});
        if (query.companyId) await queryString.andWhere("Company.id = :id", {id: query.companyId});
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static createInventory = async (inventory: ICreateInventory): Promise<Inventory | null> => {
        const company = await CompanyDAO.findCompanyById(inventory.companyId);
        if(!company) return null;
        const createInventory =  await inventoryDAO.save(inventoryDAO.create({...inventory, company}))
        return createInventory;
    };

    static updateInventory = async (inventory: ICreateInventory, id: string): Promise<Inventory | null> => {
        const updateInventory = await inventoryDAO.findOneBy({id});
        const company = await CompanyDAO.findCompanyById(inventory.companyId);
        if(!company || !updateInventory) return null;
        return await inventoryDAO.save(Object.assign(updateInventory,{...inventory,company:company}));
    }
}