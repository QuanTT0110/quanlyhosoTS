import { Entity, Column, BeforeInsert, BeforeUpdate, Unique } from "typeorm";
import BaseModel from "./base";
import * as bcrypt from "bcryptjs";

@Entity("Staff")
@Unique(["email"])
export default class Staff extends BaseModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPw(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
