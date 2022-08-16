import Department from "../Entities/Departments";
import { AppDataSource } from "../data-source";
import { ICreateDepartment, IQueryDepartment } from "../Models/models";
import CompanyDAO from "./CompaniesDAO";

const departmentDAO = AppDataSource.getRepository(Department);

export default class DepartmentDAO {
    static findDepartmentById = async (id: string): Promise<Department | null> => {
        const result = await departmentDAO.findOne({
            where: { id: id },
            relations: { company: true },
        });
        if (!result) return null;
        return result;
    };

    static getListDepartment = async (query: IQueryDepartment): Promise<Department[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = await departmentDAO.createQueryBuilder().innerJoinAndSelect("Department.company", "Company").where("Department.name Like :name", { name: keyword });
        if (query.companyId) {
            await queryString.andWhere("Company.id = :id", { id: query.companyId });
          }
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static createDepartment = async (
        department: ICreateDepartment
      ): Promise<Department | null> => {
        const company = await CompanyDAO.findCompanyById(department.companyId);
        if (!company) {
          return null;
        }
        const createDepartment = await departmentDAO.save(
          departmentDAO.create({...department, company})
        );
        return createDepartment;
    };

    static updateDepartment = async (department: ICreateDepartment, id: string): Promise<Department | null> => {
        const updateDepartment = await departmentDAO.findOneBy({id});
        const company = await CompanyDAO.findCompanyById(department.companyId);
        if(!updateDepartment || !company) return null;
        return await departmentDAO.save(
            Object.assign(updateDepartment, { ...department, company: company })
          );
    };
    
}