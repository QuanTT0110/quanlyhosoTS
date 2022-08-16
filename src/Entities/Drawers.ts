import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./Base";;
import Cabinet from "./Cabinets";
import Document from "./Documents";

@Entity("Drawer")
export default class Drawer extends BaseModel {
    @Column()
    name: string;

    @ManyToOne(() => Cabinet, (cabinet) => cabinet.drawers)
    @JoinColumn()
    cabinet: Cabinet;

    @OneToMany(() => Document, (document) => document.drawer)
    documents: Document[];
}