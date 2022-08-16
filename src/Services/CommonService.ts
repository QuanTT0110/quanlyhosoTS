import StaffDAO from "../DAO/StaffsDAO";
import DepartmentDAO from "../DAO/DepartmentsDAO";
import { ILogin } from "../Models/models";
import { Department, Staff } from "../Entities/Index";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import responseMsg from "../Message";
import config from "../Config/config";

export default class CommonService {
    static login = async (login: ILogin) => {
        const user: Staff | null = await StaffDAO.findStaffByEmail(login.email);
        if (!user) return { data: null, message: responseMsg.NOT_FOUND };
        if (!user.isRoot) {
            if (!user.active) return { data: null, message: responseMsg.ACCOUNT_IS_DISABLE };
        }
        if (await bcrypt.compare(login.password, user.password)) {
            const accessToken = jwt.sign(
                { ...user, password: null },
                config.jwtSecret,
                {
                    expiresIn: "24h",
                }
            );
            return {
                data: { email: user.email, name: user.name, token: accessToken },
                message: responseMsg.SUCCESS,
            };
        }
        return { data: null, message: responseMsg.WRONG_INPUT };
    }
    static getStaff = async (user: Staff) => {
        const staff = await StaffDAO.findStaffById(user.id);
        if (!staff) {
            return { data: null, message: responseMsg.ALREADY_EXIST };
        }
        const accessToken = jwt.sign(
            { ...staff, password: null },
            config.jwtSecret,
            {
                expiresIn: "24h",
            }
        );
        return {
            data: { user: staff, token: accessToken },
            message: responseMsg.SUCCESS,
        };
    }
}