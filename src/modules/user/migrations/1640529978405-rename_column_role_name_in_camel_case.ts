import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameColumnRoleNameInCamelCase1640529978405
  implements MigrationInterface
{
  name = 'renameColumnRoleNameInCamelCase1640529978405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" RENAME COLUMN "roleName" TO "role_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" RENAME COLUMN "role_name" TO "roleName"`,
    );
  }
}
