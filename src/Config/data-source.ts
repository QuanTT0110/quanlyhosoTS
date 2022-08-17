import { DataSource } from "typeorm";
import Staff from "../entities/staff"

export default class db {
    private static appDataSource : DataSource

    static setAppDataSource = (env: NodeJS.ProcessEnv) => {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "macbook",
            password: "1206",
            database: "quanlystaff",
            synchronize: true,
            logging: false,
            entities: [Staff],
        });
    }

    static getAppDataSource = () => {
        return this.appDataSource;
    };

    static getStaffRepository = () => {
        return this.appDataSource.getRepository(Staff);
    }
}