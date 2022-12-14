import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./Base";
import Inventory from "./inventories";
import Drawer from "./drawers"

@Entity("Cabinet")
export default class Cabinet extends BaseModel {
    @Column()
    name: string;

    @ManyToOne(() =>  Inventory, (inventory) => inventory.cabinets)
    @JoinColumn()
    inventory: Inventory;

    @OneToMany(() => Drawer, (drawer) => drawer.cabinet)
    drawers: Drawer[];
}