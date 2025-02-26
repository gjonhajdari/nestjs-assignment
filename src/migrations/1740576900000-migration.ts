import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740576900000 implements MigrationInterface {
    name = 'Migration1740576900000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726"`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726"`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
