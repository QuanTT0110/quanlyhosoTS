import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import BaseModel from "./Base";
import Drawer from "./drawers";
import Staff from "./staffs";

@Entity("Document")
export default class Document extends BaseModel {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: "pending" })
    status: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: string;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updatedAt: string;

    @ManyToOne(() => Staff, (staff) => staff.documents)
    @JoinColumn()
    staff: Staff;

    @ManyToOne(() => Drawer, (drawer) => drawer.documents)
    @JoinColumn()
    drawer: Drawer;
}