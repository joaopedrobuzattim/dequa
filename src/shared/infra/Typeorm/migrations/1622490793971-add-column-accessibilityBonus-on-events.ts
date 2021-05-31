import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnAccessibilityBonusOnEvents1622490793971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'accessibilityBonus',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'accessibilityBonus');
  }
}
