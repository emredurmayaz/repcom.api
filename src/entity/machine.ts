import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Fault } from "./fault";

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false, default: false })
  isDeleted: boolean;

  @Column({ length: 20 })
  code: string;

  @Column()
  name: string;

  //FK
  //Faults

  @OneToMany(type => Fault, fault => fault.machine)
  faults: Fault[];
}
