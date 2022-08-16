import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import BaseModel from "./Base";
import Department from "./Departments";
import Inventory from "./Inventories";
@Entity("Company")
export default class extends BaseModel {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: "management" })
  typeCompany: string;

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[];

  @OneToMany(() => Inventory, (inventory) => inventory.company)
  inventories: Inventory[];
}