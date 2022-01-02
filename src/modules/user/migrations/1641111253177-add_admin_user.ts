import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminUser1641111253177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT into public.user (username, email, password,role_id) values ('admin','admin@yopmail.com','$2b$10$nLBaCkW3HhrUpyU8Cl3bJOKRsbx9EjpCSNi81/t1nKm3p7GjilM5e',1)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE table user');
  }
}
