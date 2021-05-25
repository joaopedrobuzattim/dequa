import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class createBirthDateColumn1621908874298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.addColumn('users', new TableColumn({
    		name: 'birthDate',
    		type: 'varchar',
    	}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.dropColumn('users','birthDate');
    }

}
