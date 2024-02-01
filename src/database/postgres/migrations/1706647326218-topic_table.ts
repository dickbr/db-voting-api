import { MigrationInterface, QueryRunner } from "typeorm";

export class TopicTable1706647326218 implements MigrationInterface {
    name = 'TopicTable1706647326218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "db"."topics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "session_id" uuid, CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db"."topics" ADD CONSTRAINT "FK_7bfe32e51ddea8d34f09f3565ba" FOREIGN KEY ("session_id") REFERENCES "db"."sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."topics" DROP CONSTRAINT "FK_7bfe32e51ddea8d34f09f3565ba"`);
        await queryRunner.query(`DROP TABLE "db"."topics"`);
    }

}
