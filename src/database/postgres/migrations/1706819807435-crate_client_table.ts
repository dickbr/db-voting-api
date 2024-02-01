import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateClientTable1706819807435 implements MigrationInterface {
    name = 'CrateClientTable1706819807435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "db"."user_sessions"`);
        await queryRunner.query(`ALTER TABLE "db"."votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"`);
        await queryRunner.query(`ALTER TABLE "db"."votes" RENAME COLUMN "user_id" TO "client_id"`);
        await queryRunner.query(`CREATE TABLE "db"."clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "db"."client_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "session_id" uuid, "client_id" uuid, CONSTRAINT "PK_1d615ffb9d2f3ae5b6bbebdb593" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db"."votes" ADD CONSTRAINT "FK_6bec4288b7adf22a7b7c285d085" FOREIGN KEY ("client_id") REFERENCES "db"."clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "db"."client_sessions" ADD CONSTRAINT "FK_82ec16a92c921fd4eb19901f992" FOREIGN KEY ("session_id") REFERENCES "db"."sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "db"."client_sessions" ADD CONSTRAINT "FK_94f17342759f17880cf44b6bd71" FOREIGN KEY ("client_id") REFERENCES "db"."clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."client_sessions" DROP CONSTRAINT "FK_94f17342759f17880cf44b6bd71"`);
        await queryRunner.query(`ALTER TABLE "db"."client_sessions" DROP CONSTRAINT "FK_82ec16a92c921fd4eb19901f992"`);
        await queryRunner.query(`ALTER TABLE "db"."votes" DROP CONSTRAINT "FK_6bec4288b7adf22a7b7c285d085"`);
        await queryRunner.query(`DROP TABLE "db"."client_sessions"`);
        await queryRunner.query(`DROP TABLE "db"."clients"`);
        await queryRunner.query(`ALTER TABLE "db"."votes" RENAME COLUMN "client_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "db"."votes" ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "db"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
