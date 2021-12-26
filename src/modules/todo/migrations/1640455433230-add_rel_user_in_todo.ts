import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelUserInTodo1640455433230 implements MigrationInterface {
  name = 'addRelUserInTodo1640455433230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_9cb7989853c4cb7fe427db4b260" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_9cb7989853c4cb7fe427db4b260"`,
    );
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "user_id"`);
  }
}
