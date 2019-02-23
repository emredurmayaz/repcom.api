import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPersonnel1550937825875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "personnel" ("id" SERIAL NOT NULL, "code" character varying(20) NOT NULL, "name" character varying NOT NULL, "externalAuthId" character, "type" character NOT NULL, CONSTRAINT "PK_33a7253a5d2a326fec3cdc0baa5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "personnel"`);
    }

}
