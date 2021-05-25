import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disabilities')
class Disability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default Disability;
