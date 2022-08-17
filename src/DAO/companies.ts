import { Company } from "../Entities/Index";
import { ICreateCompany, IQueryCompany } from "../models/models";
import { AppDataSource } from "../data-source";
import { Brackets } from "typeorm";

const companyDAO = AppDataSource.getRepository(Company);

export default class CompanyDAO {
    static createCompany = async (
        company: ICreateCompany
    ): Promise<Company | null> => {
        return await companyDAO.save(
            companyDAO.create({ ...company, typeCompany: "management" })
        );
    };

    static findCompanyById = async (id: string): Promise<Company | null> => {
        const result = await companyDAO.findOneBy({ id });
        if (!result) { return null; }
        return result;
    }

    static updateCompany = async (
        company: ICreateCompany,
        id: string,
    ): Promise<Company | null> => {
        const updateCompany = await this.findCompanyById(id);
        if (!updateCompany) { return null; }
        else { return await companyDAO.save(Object.assign(updateCompany, company))}
    };

    static getListCompany = async (query: IQueryCompany) : Promise<Company[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword+ "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page-1) * limit : 0;
        const queryString = await companyDAO.createQueryBuilder("Company").where(
            new Brackets((qb) => {
                qb.where("Company.name LIKE :name", {
                    name: keyword,
                }).orWhere("Company.address LIKE :address", {
                    address: keyword,
                }).orWhere("Company.typeCompany = :type",{
                    type: query.typeCompany,
                })
            })
        );
        return await queryString.limit(limit).offset(skip).getMany();
    }
}
