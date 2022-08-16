import { Staff } from "../Entities/Index";
import { ICreateStaff, IQueryStaff } from "../Models/models";
import { AppDataSource } from "../data-source";
import { Brackets } from "typeorm";
import DepartmentDAO from "./DepartmentsDAO";

const staffDAO = AppDataSource.getRepository(Staff);

export default class StaffDAO {
    static findStaffByEmail = async (email: string): Promise<Staff | null> => {
        const result = await staffDAO.findOne({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                isRoot: true,
                active: true,
            },
            relations: { department: true },
        });
        if (!result) return null;
        return result;
    };

    static findStaffById = async (id: string): Promise<Staff | null> => {
        const result = await staffDAO.findOne({
            where: { id: id },
            relations: { department: true },
        });
        if (!result) return null;
        return result;
    };

    static createStaff = async (staff: ICreateStaff): Promise<Staff | null> => {
        const department = await DepartmentDAO.findDepartmentById(
            staff.departmentId
        );
        if (!department) {
            return null;
        }
        const createStaff = await staffDAO.save(
            staffDAO.create({ ...staff, department: department })
        );
        return createStaff;
    };

    static updateStaff = async (staff: ICreateStaff, id: string): Promise<Staff | null> => {
        const updateStaff = await this.findStaffById(id);
        const department = await DepartmentDAO.findDepartmentById(staff.departmentId);
        if (!updateStaff || !department) return null;
        return await staffDAO.save(
            Object.assign(updateStaff, { ...staff, department: department })
        );
    };

    static getListStaff = async (query: IQueryStaff): Promise<Staff[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = await staffDAO.createQueryBuilder().innerJoinAndSelect("Staff.department", "Department").where(
            new Brackets((qb) => {
                qb.where("Staff.name LIKE :name", { name: keyword }).orWhere("Staff.email LIKE :email", { email: keyword });
            })
        );
        if (query.active) {
            await queryString.andWhere("Staff.active = :active", {
                active: query.active,
            });
        }
        if (query.departmentId) {
            await queryString.andWhere("Department.id = :id", {
                id: query.departmentId,
            });
        }
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static changeActive = async (id: string): Promise<Staff | null> => {
        const oldStaff = await this.findStaffById(id);
        if(!oldStaff) return null;
        const updateStaff = await staffDAO.update(id, {
            active: !oldStaff.active,
        });
        if (!updateStaff.affected) return null;
        await oldStaff.reload();
        return oldStaff;    
    }
}