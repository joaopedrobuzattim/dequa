import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class dropDataColumnsOnDisabilities1621714920253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('disabilities', 'createdAt');
    await queryRunner.dropColumn('disabilities', 'updatedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'disabilities',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
    await queryRunner.addColumn(
      'disabilities',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}
