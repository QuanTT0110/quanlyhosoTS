import { Drawer } from "../Entities/Index";
import { ICreateDrawer, IQueryDrawer } from "../Models/models";
import { AppDataSource } from "../data-source";
import CabinetDAO from "./CabinetsDAO";

const drawerDAO = AppDataSource.getRepository(Drawer);

export default class DrawerDAO {
    static findDrawerById = async (id: string): Promise<Drawer | null> => {
        const result = drawerDAO.findOne({
            where: { id: id },
            relations: { cabinet: true },
        });
        if (!result) return null;
        return result;
    };

    static getListDrawer = async (query: IQueryDrawer): Promise<Drawer[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = await Drawer.createQueryBuilder("Drawer")
            .innerJoinAndSelect("Drawer.cabinet", "Cabinet")
            .innerJoin("Cabinet.inventory", "Inventory")
            .innerJoin("Inventory.company", "Company")
            .where("Drawer.name LIKE :name", { name: keyword });
        if (query.typeCompany &&
            (query.typeCompany == "management" || query.typeCompany == "storage")) {
            await queryString.andWhere("Company.typeCompany = :type", { type: query.typeCompany })
        }
        if(query.cabinetId) {
            await queryString.andWhere("Cabinet.id = :id",{id: query.cabinetId})
        }
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static createDrawer = async (drawer: ICreateDrawer): Promise<Drawer | null> => {
        const cabinet = await CabinetDAO.findCabinetById(drawer.cabinetId);
        if (!cabinet) return null;
        const createDrawer = await drawerDAO.save(drawerDAO.create({...drawer,cabinet}));
        return createDrawer;
    };

    static updateDrawer = async (drawer: ICreateDrawer, id: string): Promise<Drawer | null> => {
        const cabinet = await CabinetDAO.findCabinetById(drawer.cabinetId);
        const updateDrawer = await drawerDAO.findOneBy({id})
        if(!cabinet || !updateDrawer) return null;
        return await drawerDAO.save(Object.assign(updateDrawer,{...drawer,cabinet: cabinet}));
    };

    static isManagementCompany = async (id: string): Promise<Boolean> => {
        const drawer = await drawerDAO
          .createQueryBuilder("Drawer")
          .innerJoinAndSelect("Drawer.cabinet", "Cabinet")
          .innerJoinAndSelect("Cabinet.inventory", "Inventory")
          .innerJoinAndSelect("Inventory.company", "Company")
          .where("Drawer.id = :id", { id })
          .getOne();
        return drawer?.cabinet.inventory.company.typeCompany == "management";
      };
}