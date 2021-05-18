import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({
    enum: ['freeUser', 'admin', 'boss', 'premiumUser'],
  })
  role: 'freeUser' | 'admin' | 'boss' | 'premiumUser';

  @Column()
  cpf: string;

  @Column()
  isActive: boolean;

  @Column()
  disability: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: string;
}

export default User;
