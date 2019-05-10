import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Machine } from "./machine";
import { FaultType } from "./faultType";
import { Personnel } from "./personnel";

@Entity()
export class Fault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false, default: false })
  isDeleted: boolean;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "smallint", default: 0 })
  priority: number;

  // FK
  // Machine
  @Column()
  machineId: number;

  @ManyToOne(type => Machine, machine => machine.faults)
  machine: Machine;

  //Fault Type
  @Column()
  faultTypeId: number;

  @ManyToOne(type => FaultType, faultType => faultType.faults)
  faultType: FaultType;

  //Personnel
  @Column()
  personnelId: number;

  @ManyToOne(type => Personnel, personnel => personnel.faults)
  personnel: Personnel;
}
