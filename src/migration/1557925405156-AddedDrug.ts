import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDrug1557925405156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "drug" ("id" SERIAL NOT NULL, "expiredDate" date NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_84d53e7c3b5e562421850eb9723" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "drug"`);
    }

}
