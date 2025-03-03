import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740990775925 implements MigrationInterface {
    name = 'Migration1740990775925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" RENAME COLUMN "active" TO "is_active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" RENAME COLUMN "is_active" TO "active"`);
    }

}
