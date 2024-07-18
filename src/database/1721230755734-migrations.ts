import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721230755734 implements MigrationInterface {
    name = 'Migrations1721230755734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autosalons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_98ba85b122a1abebf38553aace7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "autoSalonId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "autoSalonRoleId" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "autoSalonId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_539d1eb9f86bd3ce9fe364ed38e" FOREIGN KEY ("autoSalonId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b4a760753caa28ff8ab2e57a44e" FOREIGN KEY ("autoSalonRoleId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_07cea705f34ad9ef631a6015e54" FOREIGN KEY ("autoSalonId") REFERENCES "autosalons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_07cea705f34ad9ef631a6015e54"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b4a760753caa28ff8ab2e57a44e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_539d1eb9f86bd3ce9fe364ed38e"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "autoSalonId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "autoSalonRoleId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "autoSalonId"`);
        await queryRunner.query(`DROP TABLE "autosalons"`);
    }

}
