import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721036249286 implements MigrationInterface {
    name = 'Migrations1721036249286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banned" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "banReason" text NOT NULL, CONSTRAINT "PK_acc9f19a159ce2536a836f51664" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "banned" ADD CONSTRAINT "FK_9a521ef7e874e2a9eea93c62964" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banned" DROP CONSTRAINT "FK_9a521ef7e874e2a9eea93c62964"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "banned"`);
    }

}
