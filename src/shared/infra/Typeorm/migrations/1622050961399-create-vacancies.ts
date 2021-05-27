import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createVacancies1622048774768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacancies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'office',
            type: 'varchar',
          },
          {
            name: 'level',
            type: 'varchar',
            enum: ['internship', 'trainee', 'junior', 'senior', 'full', 'master'],
          },
          {
            name: 'isRemote',
            type: 'boolean',
            default: false,
          },
          {
            name: 'companiesId',
            type: 'uuid',
          },
          {
            name: 'categoriesId',
            type: 'uuid',
          },
          {
            name: 'workload',
            type: 'varchar',
          },
          {
            name: 'salary',
            type: 'float',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'companyFK',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['companiesId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'categoryFK',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categoriesId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacancies');
  }
}
