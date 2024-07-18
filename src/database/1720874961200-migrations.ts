import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720874961200 implements MigrationInterface {
    name = 'Migrations1720874961200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "exchange_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5" FOREIGN KEY ("exchange_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "exchange_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5" FOREIGN KEY ("exchange_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
