import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSessionTable1706704518261 implements MigrationInterface {
    name = 'UserSessionTable1706704518261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "db"."user_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "session_id" uuid, "user_id" uuid, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db"."sessions" ADD "session_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "db"."users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "db"."users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "db"."users" ADD "role" "db"."users_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "db"."user_sessions" ADD CONSTRAINT "FK_b6c41d19165af4c69eba9ecda46" FOREIGN KEY ("session_id") REFERENCES "db"."sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "db"."user_sessions" ADD CONSTRAINT "FK_e9658e959c490b0a634dfc54783" FOREIGN KEY ("user_id") REFERENCES "db"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."user_sessions" DROP CONSTRAINT "FK_e9658e959c490b0a634dfc54783"`);
        await queryRunner.query(`ALTER TABLE "db"."user_sessions" DROP CONSTRAINT "FK_b6c41d19165af4c69eba9ecda46"`);
        await queryRunner.query(`ALTER TABLE "db"."users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "db"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "db"."users" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "db"."sessions" DROP COLUMN "session_time"`);
        await queryRunner.query(`DROP TABLE "db"."user_sessions"`);
    }

}
