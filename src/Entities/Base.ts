import { PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export default abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}

