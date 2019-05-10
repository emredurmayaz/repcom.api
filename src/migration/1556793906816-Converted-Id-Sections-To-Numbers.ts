import {MigrationInterface, QueryRunner} from "typeorm";

export class ConvertedIdSectionsToNumbers1556793906816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fault" RENAME COLUMN "priorty" TO "priority"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fault" RENAME COLUMN "priority" TO "priorty"`);
    }

}
