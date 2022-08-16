import {
    Entity,
    Column,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
    OneToMany,
    BeforeUpdate,
  } from "typeorm";
import BaseModel from "./Base";
import * as bcrypt from "bcryptjs";
import Department from "./Departments";
import Document from "./Documents"

@Entity("Staff")
export default class Staff extends BaseModel {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    isRoot?: boolean;

    @Column()
    active?: boolean;

    @ManyToOne(() => Department, (department) => department.staffs)
    @JoinColumn()
    department: Department;

    @OneToMany(() => Document, (document) => document.staff)
    documents: Document[];
    @BeforeInsert()
    @BeforeUpdate()
    async hassPw() : Promise<void>{
        this.password = await bcrypt.hash(this.password, 10);
    }
}