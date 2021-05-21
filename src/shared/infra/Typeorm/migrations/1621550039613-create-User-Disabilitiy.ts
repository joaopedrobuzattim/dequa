import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createUserDisabilitiy1621550039613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users-disabilities',
        columns: [
          {
            name: 'disabilitiesId',
            type: 'uuid',
          },
          {
            name: 'usersId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['usersId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKDisabilityd',
            referencedTableName: 'disabilities',
            referencedColumnNames: ['id'],
            columnNames: ['disabilitiesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users-disabilities');
  }
}
