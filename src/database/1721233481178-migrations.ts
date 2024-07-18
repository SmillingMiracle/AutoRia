import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721233481178 implements MigrationInterface {
    name = 'Migrations1721233481178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "carSalon_id"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userSalon_id"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userSalonRole"`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "carId" character varying`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userRole" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userRole"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "carId"`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userSalonRole" text`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userSalon_id" text`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "carSalon_id" text`);
    }

}
