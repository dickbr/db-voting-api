import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategorySessionTable1706744919975 implements MigrationInterface {
    name = 'AddCategorySessionTable1706744919975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."sessions" ADD "category" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."sessions" DROP COLUMN "category"`);
    }

}
