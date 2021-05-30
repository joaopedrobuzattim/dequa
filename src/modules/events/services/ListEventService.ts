import { inject, injectable } from 'tsyringe';
import Event from '../infra/Typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
export default class ListEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(name?: string, theme?: string): Promise<Event[]> {
    if (name) {
      const events = await this.eventsRepository.findByName(name);

      return events;
    }

    if (theme) {
      const events = await this.eventsRepository.findByTheme(theme);

      return events;
    }

    const events = await this.eventsRepository.list();

    return events;
  }
}
