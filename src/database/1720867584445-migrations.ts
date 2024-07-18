import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720867584445 implements MigrationInterface {
    name = 'Migrations1720867584445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "exchange_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "exchange_id"`);
    }

}
