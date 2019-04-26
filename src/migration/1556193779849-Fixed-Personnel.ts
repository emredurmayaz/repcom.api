import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedPersonnel1556193779849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "fault_type" ("id" SERIAL NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "code" character varying(20) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_28164e197b5355a92246b9448c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fault" ADD "faultTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fault" ADD "personnelId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "externalAuthId"`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "externalAuthId" character varying`);
        await queryRunner.query(`ALTER TABLE "fault" ADD CONSTRAINT "FK_e85e8c07aac17bda75f50cbf405" FOREIGN KEY ("faultTypeId") REFERENCES "fault_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fault" ADD CONSTRAINT "FK_d6e7827527c47632b3d468b6445" FOREIGN KEY ("personnelId") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fault" DROP CONSTRAINT "FK_d6e7827527c47632b3d468b6445"`);
        await queryRunner.query(`ALTER TABLE "fault" DROP CONSTRAINT "FK_e85e8c07aac17bda75f50cbf405"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "externalAuthId"`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "externalAuthId" character`);
        await queryRunner.query(`ALTER TABLE "fault" DROP COLUMN "personnelId"`);
        await queryRunner.query(`ALTER TABLE "fault" DROP COLUMN "faultTypeId"`);
        await queryRunner.query(`DROP TABLE "fault_type"`);
    }

}
