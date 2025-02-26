import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740604542841 implements MigrationInterface {
    name = 'Migration1740604542841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_key" ("id" character varying(40) NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_key"`);
    }

}
