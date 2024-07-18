import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720882936942 implements MigrationInterface {
    name = 'Migrations1720882936942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_9ccef07d3219cc21d58b234fc19"`);
        await queryRunner.query(`ALTER TABLE "views" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "car_id"`);
        await queryRunner.query(`ALTER TABLE "views" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "views" ADD "car_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_5a616073aea982ac9a6c5eb40d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_8081f5698045410f5099bb0c56e" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_8081f5698045410f5099bb0c56e"`);
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_5a616073aea982ac9a6c5eb40d1"`);
        await queryRunner.query(`ALTER TABLE "views" DROP COLUMN "car_id"`);
        await queryRunner.query(`ALTER TABLE "views" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "car_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "views" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_9ccef07d3219cc21d58b234fc19" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
