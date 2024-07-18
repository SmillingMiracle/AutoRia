import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721220877341 implements MigrationInterface {
    name = 'Migrations1721220877341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "editAttempts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "isActive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "editAttempts"`);
    }

}
