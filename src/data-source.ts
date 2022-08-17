import { DataSource } from "typeorm";
import { Company, 
    Cabinet,
    Department,
    Document,
    Drawer,
    Inventory,
    Staff } from "./entities/index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "macbook",
    password: "1206",
    database: "quanlyhosoTS",
    synchronize: true,
    logging: false,
    entities: [Company, Department, Staff, Inventory, Cabinet, Drawer, Document],
    migrations: [],
    subscribers: [],
});