import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedIsDeletedColumnAllTables1556094916841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "machine" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "fault" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "fault" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "machine" DROP COLUMN "isDeleted"`);
    }

}
