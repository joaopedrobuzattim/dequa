import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class alterIsRemoteColumn1622425106855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'vacancies',
      'isRemote',
      new TableColumn({
        name: 'contract',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'vacancies',
      'contract',
      new TableColumn({
        name: 'isRemote',
        type: 'boolean',
      }),
    );
  }
}
