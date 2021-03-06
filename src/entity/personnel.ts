import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PersonnelType } from "../const/const.enum";
import { Fault } from "./fault";

@Entity()
export class Personnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false, default: false })
  isDeleted: boolean;

  @Column({ length: 20 })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  externalAuthId: string | null;

  @Column({ type: "char" })
  type: PersonnelType;

  // FK
  // Faults
  @OneToMany(type => Fault, fault => fault.personnel)
  faults: Fault[];
}
