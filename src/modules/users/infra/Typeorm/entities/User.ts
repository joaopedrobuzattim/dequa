import Disability from '@modules/disabilities/infra/Typeorm/entities/Disability';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({})
  role: 'freeUser' | 'admin' | 'boss' | 'premiumUser';

  @Column()
  cpf: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Disability, (disability) => disability.name)
  @JoinTable({ name: 'users-disabilities' })
  disability: Disability[];
}

export default User;
