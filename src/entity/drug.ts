import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Drug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  expiredDate: Date;

  @Column()
  name: string;

  @Column({ select: false, default: false })
  isDeleted: boolean;
}
