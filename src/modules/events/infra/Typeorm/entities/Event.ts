import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Theme from './Theme';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumb: string;

  @Column()
  themeId: string;

  @ManyToOne(() => Theme, (theme) => theme.events)
  @JoinColumn({ name: 'themeId' })
  theme: Theme;

  @Column()
  date: string;

  @Column()
  transmissionMedium: string;

  @Column()
  accessibilityBonus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Event;
