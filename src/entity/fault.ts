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
  priorty: number;

  // FK
  // Machine
  @Column("uuid")
  machineId: string;

  @ManyToOne(type => Machine, machine => machine.faults)
  machine: Machine;

  //Fault Type
  @Column("uuid")
  faultTypeId: string;

  @ManyToOne(type => FaultType, faultType => faultType.faults)
  faultType: FaultType;

  //Personnel
  @Column("uuid")
  personnelId: string;

  @ManyToOne(type => Personnel, personnel => personnel.faults)
  personnel: Personnel;
}
