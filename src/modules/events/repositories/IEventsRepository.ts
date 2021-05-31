import Event from '../infra/Typeorm/entities/Event';

export default interface IEventsRepository {
  list(): Promise<Event[]>;
  findById(id: string): Promise<Event[] | undefined>;
  findByName(name: string): Promise<Event[]>;
  findByTheme(theme: string[]): Promise<Event[]>;
}
