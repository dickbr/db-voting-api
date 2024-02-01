import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColunSessionTable1706714204273 implements MigrationInterface {
    name = 'AddColunSessionTable1706714204273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "db"."users" ADD "role" "db"."users_role_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "db"."users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "db"."users" ADD "role" character varying NOT NULL`);
    }

}
