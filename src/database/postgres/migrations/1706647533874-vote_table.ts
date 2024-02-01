import { MigrationInterface, QueryRunner } from "typeorm";

export class VoteTable1706647533874 implements MigrationInterface {
    name = 'VoteTable1706647533874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "db"."votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "topic_id" uuid NOT NULL, "choice" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "db"."votes" ADD CONSTRAINT "FK_ec6bc56adab31a21334d07cc117" FOREIGN KEY ("topic_id") REFERENCES "db"."topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."votes" DROP CONSTRAINT "FK_ec6bc56adab31a21334d07cc117"`);
        await queryRunner.query(`DROP TABLE "db"."votes"`);
    }

}
