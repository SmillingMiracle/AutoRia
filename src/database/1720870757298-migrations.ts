import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720870757298 implements MigrationInterface {
    name = 'Migrations1720870757298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "exchange_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5" FOREIGN KEY ("exchange_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "exchange_id" character varying NOT NULL`);
    }

}
