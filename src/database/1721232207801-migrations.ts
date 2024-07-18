import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721232207801 implements MigrationInterface {
    name = 'Migrations1721232207801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_539d1eb9f86bd3ce9fe364ed38e"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_07cea705f34ad9ef631a6015e54"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "autoSalonId" TO "autoSalonIdId"`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "autoSalonId" TO "autoSalonIdId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b422bf9dd8f58f0a2e427dfafe" FOREIGN KEY ("autoSalonIdId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_7630bb8061428cec48fc430bc49" FOREIGN KEY ("autoSalonIdId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_7630bb8061428cec48fc430bc49"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b422bf9dd8f58f0a2e427dfafe"`);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "autoSalonIdId" TO "autoSalonId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "autoSalonIdId" TO "autoSalonId"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_07cea705f34ad9ef631a6015e54" FOREIGN KEY ("autoSalonId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_539d1eb9f86bd3ce9fe364ed38e" FOREIGN KEY ("autoSalonId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
