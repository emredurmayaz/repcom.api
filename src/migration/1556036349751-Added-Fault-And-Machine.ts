import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFaultAndMachine1556036349751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "machine" ("id" SERIAL NOT NULL, "code" character varying(20) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_acc588900ffa841d96eb5fd566c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fault" ("id" SERIAL NOT NULL, "date" date NOT NULL, "priorty" smallint NOT NULL DEFAULT 0, "machineId" integer NOT NULL, CONSTRAINT "PK_491064e4de7cedcebff7206547b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fault" ADD CONSTRAINT "FK_780d1a7038c494cbca9ac3c54db" FOREIGN KEY ("machineId") REFERENCES "machine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fault" DROP CONSTRAINT "FK_780d1a7038c494cbca9ac3c54db"`);
        await queryRunner.query(`DROP TABLE "fault"`);
        await queryRunner.query(`DROP TABLE "machine"`);
    }

}
