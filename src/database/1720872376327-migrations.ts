import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720872376327 implements MigrationInterface {
    name = 'Migrations1720872376327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_434d0dc3186e42461e01efeb469"`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "exchangeId" TO "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "exchange_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "exchange_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "exchange_id" TO "exchangeId"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_434d0dc3186e42461e01efeb469" FOREIGN KEY ("exchangeId") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
