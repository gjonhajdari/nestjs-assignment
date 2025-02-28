import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740756452573 implements MigrationInterface {
    name = 'Migration1740756452573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_2fe7a278e6f08d2be55740a939" ON "task" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2fe7a278e6f08d2be55740a939"`);
    }

}
