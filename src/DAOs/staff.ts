import { Staff } from "../entities";
import { IStaffCreatePayload, IStaffQueryAll } from "../models/staff";
import db from "../config/data-source";
import { Brackets } from "typeorm";

export const findByEmail = async (
  email: string
): Promise<[Staff | null, Error | null]> => {
  const staff = await db.getStaffRepository().findOne({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  if (!staff) return [null, new Error("Staff not found")];
  return [staff, null];
};

export const findById = async (
  id: string
): Promise<[Staff | null, Error | null]> => {
  const staff = await db.getStaffRepository().findOne({
    where: { email: id },
  });
  if (!staff) return [null, new Error("Staff not found")];
  return [staff, null];
};

export const create = async (
  staff: IStaffCreatePayload
): Promise<[Staff | null, Error | null]> => {
  try {
    const data = await db
      .getStaffRepository()
      .save(db.getStaffRepository().create(staff));
    if (!data) return [null, new Error("Create error")];
    return [data, null];
  } catch (err: unknown) {
    return [null, err as Error];
  }
};

export const update = async (
  staff: IStaffCreatePayload
): Promise<[Staff | null, Error | null]> => {
  try {
    const data = await db.getStaffRepository().save(staff);
    if (!data) return [null, new Error("Update error")];
    return [data, null];
  } catch (err: unknown) {
    return [null, err as Error];
  }
};

export const all = async (query: IStaffQueryAll): Promise<Staff[]> => {
  const skip = query.page > 0 ? Math.floor(query.page - 1) * query.limit : 0;
  const queryString = await db.getStaffRepository().createQueryBuilder();

  if (query.keyword) {
    queryString.andWhere(
      new Brackets((qb) => {
        qb.where("Staff.name LIKE :name", { name: query.keyword }).orWhere(
          "Staff.email LIKE :email",
          { email: query.keyword }
        );
      })
    );
  }

  return await queryString.limit(query.limit).offset(skip).getMany();
};
