import { Staff } from "../entities";
import { ICreateStaff, IQueryStaff } from "../models/models";
import db from "../config/data-source";
import { Brackets } from "typeorm";

export const findByEmail = async (email: string): Promise<Staff | null> => {
    return await db.getStaffRepository().findOne({
        where: { email: email },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
};

export const findById = async (id: string): Promise<Staff | null> => {
    return await db.getStaffRepository().findOne({
        where: { email: id }
    });
};

export const create = async (staff: ICreateStaff): Promise<Staff | null> => {
    const data = await db.getStaffRepository().save(
        db.getStaffRepository().create(staff)
    );

    return data;
};

export const update = async (staff: ICreateStaff): Promise<Staff | null> => {
    const data = await db.getStaffRepository().save(staff);

    return data;
};

export const getList = async (query: IQueryStaff): Promise<Staff[]> => {
    const skip = query.page > 0 ? Math.floor(query.page - 1) * query.limit : 0;
    const queryString = await db.getStaffRepository().createQueryBuilder();

    if (query.keyword) {
        queryString.andWhere(
            new Brackets((qb) => {
                qb.where("Staff.name LIKE :name", { name: query.keyword }).orWhere(
                    "Staff.email LIKE :email", { email: query.keyword }
                )
            })
        )
    }

    return await queryString.limit(query.limit).offset(skip).getMany();
};