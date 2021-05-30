import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Event from './Event';

@Entity('themes')
class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.theme)
  events: Event[];
}

export default Theme;
