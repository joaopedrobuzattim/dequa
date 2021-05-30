import { container } from 'tsyringe';
import { Request, Response } from 'express';
import GetEventService from '@modules/events/services/GetEventService';
import ListEventService from '@modules/events/services/ListEventService';

export default class EventsController {
  async list(request: Request, response: Response): Promise<Response> {
    const listEvents = container.resolve(ListEventService);

    if (request.query.name) {
      const name = String(request.query.name);
      const filteredEvents = await listEvents.execute(name, undefined);
      return response.status(200).json(filteredEvents);
    }
    if (request.query.theme) {
      const theme = String(request.query.theme);
      const filteredThemes = await listEvents.execute(undefined, theme);
      return response.status(200).json(filteredThemes);
    }

    const events = await listEvents.execute();

    return response.status(200).json(events);
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getEvent = container.resolve(GetEventService);

    const event = await getEvent.execute(id);

    return response.status(200).json(event);
  }
}
