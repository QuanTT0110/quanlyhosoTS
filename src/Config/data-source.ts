import { DataSource } from "typeorm";
import Staff from "../entities/staff";

let db: DataSource;

const setAppDataSource = (env: NodeJS.ProcessEnv) => {
  db = new DataSource({
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
};

const getAppDataSource = () => {
  return db;
};

const getStaffRepository = () => {
  return db.getRepository(Staff);
};

export default { setAppDataSource, getAppDataSource, getStaffRepository };
