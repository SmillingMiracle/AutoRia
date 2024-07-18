import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720872507348 implements MigrationInterface {
    name = 'Migrations1720872507348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "follower_id" uuid NOT NULL, "following_id" uuid NOT NULL, CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "car_id" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text, "type" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "body" text NOT NULL, "car_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "originalPrice" integer NOT NULL, "originalCurrency" character varying NOT NULL, "priceInUSD" integer NOT NULL, "priceInEUR" integer NOT NULL, "priceInUAH" integer NOT NULL, "exchangeRateUSD" integer NOT NULL, "exchangeRateEUR" integer NOT NULL, "exchangeRateUAH" integer NOT NULL, CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "price" text NOT NULL, "currency" text NOT NULL, "locate" text NOT NULL, "description" text NOT NULL, "body" text NOT NULL, "user_id" uuid NOT NULL, "exchange_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_cars_cars" ("exchangeId" uuid NOT NULL, "carsId" uuid NOT NULL, CONSTRAINT "PK_52b92dc85e118e41e8fa7472b49" PRIMARY KEY ("exchangeId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_979a1b01d3f2c182648c82b060" ON "exchange_cars_cars" ("exchangeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3e88deb77decfd1210964932c" ON "exchange_cars_cars" ("carsId") `);
        await queryRunner.query(`CREATE TABLE "views_cars_cars" ("viewsId" uuid NOT NULL, "carsId" uuid NOT NULL, CONSTRAINT "PK_bccebfcdad937eb45322b72fc3b" PRIMARY KEY ("viewsId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef082f10770551f63166ff3a5c" ON "views_cars_cars" ("viewsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ae5dad065490c59e0a822cae0" ON "views_cars_cars" ("carsId") `);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_9ccef07d3219cc21d58b234fc19" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d1f1aa28e6eb805b5e7e4b7195f" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5" FOREIGN KEY ("exchange_id") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" ADD CONSTRAINT "FK_979a1b01d3f2c182648c82b0606" FOREIGN KEY ("exchangeId") REFERENCES "exchange"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" ADD CONSTRAINT "FK_b3e88deb77decfd1210964932c4" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" ADD CONSTRAINT "FK_ef082f10770551f63166ff3a5c4" FOREIGN KEY ("viewsId") REFERENCES "views"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" ADD CONSTRAINT "FK_1ae5dad065490c59e0a822cae07" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views_cars_cars" DROP CONSTRAINT "FK_1ae5dad065490c59e0a822cae07"`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" DROP CONSTRAINT "FK_ef082f10770551f63166ff3a5c4"`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" DROP CONSTRAINT "FK_b3e88deb77decfd1210964932c4"`);
        await queryRunner.query(`ALTER TABLE "exchange_cars_cars" DROP CONSTRAINT "FK_979a1b01d3f2c182648c82b0606"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d6b05cdd99dd99ab98e54d165f5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d1f1aa28e6eb805b5e7e4b7195f"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_9ccef07d3219cc21d58b234fc19"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ae5dad065490c59e0a822cae0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef082f10770551f63166ff3a5c"`);
        await queryRunner.query(`DROP TABLE "views_cars_cars"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3e88deb77decfd1210964932c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_979a1b01d3f2c182648c82b060"`);
        await queryRunner.query(`DROP TABLE "exchange_cars_cars"`);
        await queryRunner.query(`DROP TABLE "views"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "exchange"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
