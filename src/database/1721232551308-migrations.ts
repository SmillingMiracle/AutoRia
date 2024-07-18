import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721232551308 implements MigrationInterface {
    name = 'Migrations1721232551308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "carSalon_id" text`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userSalon_id" text`);
        await queryRunner.query(`ALTER TABLE "autosalons" ADD "userSalonRole" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userSalonRole"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "userSalon_id"`);
        await queryRunner.query(`ALTER TABLE "autosalons" DROP COLUMN "carSalon_id"`);
    }

}
