import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Vacancy from '@modules/vacancies/infra/Typeorm/entities/Vacancy';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.category)
  vacancies: Vacancy[];
}

export default Category;
