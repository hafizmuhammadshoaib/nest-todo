import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRole_tableAndRoleColInUser1640529286361
  implements MigrationInterface
{
  name = 'addRole_tableAndRoleColInUser1640529286361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`,
    );

    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
