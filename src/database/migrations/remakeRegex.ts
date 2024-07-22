import { MigrationInterface, QueryRunner } from "typeorm";

export class Folder1721631526090 implements MigrationInterface {
    name = 'Folder1721631526090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN', 'MODERATOR', 'BANNED')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('BASE', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'BASE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" text NOT NULL DEFAULT 'user'`);
    }

}
