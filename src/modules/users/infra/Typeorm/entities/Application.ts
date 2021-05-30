import User from '@modules/users/infra/Typeorm/entities/User';
import Vacancy from '@modules/vacancies/infra/Typeorm/entities/Vacancy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('applications')
class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  curriculumn: string;

  @Column()
  linkedin: string;

  @Column()
  vacancyId: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Vacancy)
  @JoinColumn({ name: 'vacancyId' })
  vacancy: Vacancy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Application;
