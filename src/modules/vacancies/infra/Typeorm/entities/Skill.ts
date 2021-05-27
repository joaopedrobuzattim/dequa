import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default Skill;
