import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721210630635 implements MigrationInterface {
    name = 'Migrations1721210630635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "totalViews" integer, "dailyViews" integer, "weeklyViews" integer, "monthlyViews" integer, "avgPriceRegion" integer, "avgPriceCountry" integer, CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stats_car_cars" ("statsId" uuid NOT NULL, "carsId" uuid NOT NULL, CONSTRAINT "PK_f89774db32b1acc32d90260ac50" PRIMARY KEY ("statsId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f28b8273dbb51576dd1e6fe5ea" ON "stats_car_cars" ("statsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_170978d3124d01833c96179c73" ON "stats_car_cars" ("carsId") `);
        await queryRunner.query(`ALTER TABLE "stats_car_cars" ADD CONSTRAINT "FK_f28b8273dbb51576dd1e6fe5eaa" FOREIGN KEY ("statsId") REFERENCES "stats"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stats_car_cars" ADD CONSTRAINT "FK_170978d3124d01833c96179c731" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stats_car_cars" DROP CONSTRAINT "FK_170978d3124d01833c96179c731"`);
        await queryRunner.query(`ALTER TABLE "stats_car_cars" DROP CONSTRAINT "FK_f28b8273dbb51576dd1e6fe5eaa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_170978d3124d01833c96179c73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f28b8273dbb51576dd1e6fe5ea"`);
        await queryRunner.query(`DROP TABLE "stats_car_cars"`);
        await queryRunner.query(`DROP TABLE "stats"`);
    }

}
