import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRolesInRoleTable1640530137089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT into role (role_name) values ('ADMIN')");
    await queryRunner.query("INSERT into role (role_name) values ('USER')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('Truncate Table role');
  }
}
