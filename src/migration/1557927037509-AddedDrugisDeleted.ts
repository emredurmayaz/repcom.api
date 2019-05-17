import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDrugisDeleted1557927037509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drug" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drug" DROP COLUMN "isDeleted"`);
    }

}
