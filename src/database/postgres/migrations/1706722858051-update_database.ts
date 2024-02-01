import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1706722858051 implements MigrationInterface {
    name = 'UpdateDatabase1706722858051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."sessions" DROP COLUMN "session_time"`);
        await queryRunner.query(`ALTER TABLE "db"."sessions" ADD "session_time" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."sessions" DROP COLUMN "session_time"`);
        await queryRunner.query(`ALTER TABLE "db"."sessions" ADD "session_time" TIMESTAMP NOT NULL`);
    }

}
