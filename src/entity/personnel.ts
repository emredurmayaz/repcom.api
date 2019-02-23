import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PersonnelType } from "../const/const.enum";

@Entity()
export class Personnel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    code: string;

    @Column()
    name: string;

    @Column({ type: "character", nullable: true })
    externalAuthId: string | null;

    @Column({ type: "char" })
    type: PersonnelType;
}
