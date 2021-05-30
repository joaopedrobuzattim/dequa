import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Event from '../infra/Typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
export default class GetEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id: string): Promise<Event | undefined> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Evento não encontrado!', 404);
    }

    return event[0];
  }
}
