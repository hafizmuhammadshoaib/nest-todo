import { MigrationInterface, QueryRunner } from 'typeorm';

export class todoCreate1640423382542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public".todo (
            ID SERIAL PRIMARY KEY,
            CONTENT CHAR(100)
         )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP Table IF EXISTS "public".todo');
  }
}
