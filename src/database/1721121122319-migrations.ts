import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721121122319 implements MigrationInterface {
    name = 'Migrations1721121122319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "image"`);
    }

}
