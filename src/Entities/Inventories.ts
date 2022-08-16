import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./Base";
import Cabinet from "./Cabinets";
import Company from "./Companies";

@Entity("Inventory")
export default class Inventory extends BaseModel {
    @Column()
    name: string;

    @ManyToOne(() => Company, (company) => company.inventories)
    @JoinColumn()
    company: Company;

    @OneToMany(() => Cabinet, (cabinet) => cabinet.inventory)
    cabinets: Cabinet[]; 
}