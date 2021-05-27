import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import Company from '@modules/companies/infra/Typeorm/entities/Company';
import Category from './Category';
import Skill from './Skill';

@Entity('vacancies')
class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  office: string;

  @Column()
  level: 'internship' | 'trainee' | 'junior' | 'senior' | 'full' | 'master';

  @Column()
  isRemote: boolean;

  @Column()
  companiesId: string;

  @ManyToOne(() => Company, (company) => company.vacancies)
  @JoinColumn({ name: 'companiesId' })
  company: Company;

  @Column()
  categoriesId: number;

  @ManyToOne(() => Category, (category) => category.vacancies)
  @JoinColumn({ name: 'categoriesId' })
  category: string;

  @Column()
  workload: string;

  @Column()
  salary: number;

  @Column()
  description: string;

  @ManyToMany(() => Skill, {
    eager: true,
  })
  @JoinTable({ name: 'vacancies-skills' })
  skills: Skill[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Vacancy;
