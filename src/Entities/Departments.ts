import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import BaseModel from "./Base";
import Company from "./Companies";
import Staff from "./staffs";

@Entity("Department")
export default class Department extends BaseModel {
    @Column()
    name: string;

    @ManyToOne(() => Company, (company) => company.departments)
    @JoinColumn()
    company: Company;

    @OneToMany(() => Staff, (staff) => staff.department)
    staffs: Staff[];
}