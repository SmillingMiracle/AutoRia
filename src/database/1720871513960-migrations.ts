import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720871513960 implements MigrationInterface {
    name = 'Migrations1720871513960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5"`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "exchange_id" TO "exchangeId"`);
        await queryRunner.query(`CREATE TABLE "exchange_cars_cars" ("exchangeId" uuid NOT NULL, "carsId" uuid NOT NULL, CONSTRAINT "PK_52b92dc85e118e41e8fa7472b49" PRIMARY KEY ("exchangeId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_979a1b01d3f2c182648c82b060" ON "exchange_cars_cars" ("exchangeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3e88deb77decfd1210964932c" ON "exchange_cars_cars" ("carsId") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_434d0dc3186e42461e01efeb469" FOREIGN KEY ("exchangeId") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" ADD CONSTRAINT "FK_979a1b01d3f2c182648c82b0606" FOREIGN KEY ("exchangeId") REFERENCES "exchange"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" ADD CONSTRAINT "FK_b3e88deb77decfd1210964932c4" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" DROP CONSTRAINT "FK_b3e88deb77decfd1210964932c4"`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" DROP CONSTRAINT "FK_979a1b01d3f2c182648c82b0606"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_434d0dc3186e42461e01efeb469"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3e88deb77decfd1210964932c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_979a1b01d3f2c182648c82b060"`);
        await queryRunner.query(`DROP TABLE "exchange_cars_cars"`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "exchangeId" TO "exchange_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5" FOREIGN KEY ("exchange_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
