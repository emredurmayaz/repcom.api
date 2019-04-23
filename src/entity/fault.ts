import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Machine } from "./machine";

@Entity()
export class Fault{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"date"})
    date: Date;

    @Column({type:"smallint",default:0})
    priorty: number;

    // FK
    // Machine
    @Column("uuid")
    machineId:string;

    @ManyToOne(type => Machine, machine => machine.faults)
    machine: Machine;
}