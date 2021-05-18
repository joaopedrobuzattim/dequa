import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class alteringDisabilityNullable1621352373163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'disability',
      new TableColumn({
        name: 'disability',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'disability',
      new TableColumn({
        name: 'disability',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }
}
