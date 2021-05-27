import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createVacancieskills1621550039613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacancies-skills',
        columns: [
          {
            name: 'skillsId',
            type: 'uuid',
          },
          {
            name: 'vacanciesId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKVacancyId',
            referencedTableName: 'vacancies',
            referencedColumnNames: ['id'],
            columnNames: ['vacanciesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKSkilld',
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            columnNames: ['skillsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacancies-skills');
  }
}
