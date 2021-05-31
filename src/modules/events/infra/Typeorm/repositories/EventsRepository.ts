import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import { getRepository, Repository } from 'typeorm';
import Event from '../entities/Event';

export default class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async list(): Promise<Event[]> {
    const events = await this.ormRepository.query(`
    SELECT 
	  "events"."id" as "id",
      "events"."name" as "name",
      "events"."description" as "description",
      "events"."thumb" as "thumb",
      "events"."transmissionMedium" as "transmissionMedium",
      "events"."accessibilityBonus" as "accessibilityBonus",
      "events"."date" as "date",
      json_agg("themes") as "theme"
    FROM events
    LEFT JOIN themes 
    ON  "events"."themeId" = "themes"."id"
    group by "events"."id"`);

    return events;
  }

  public async findById(id: string): Promise<Event[] | undefined> {
    const event = await this.ormRepository.query(
      `
    SELECT 
	  "events"."id" as "id",
      "events"."name" as "name",
      "events"."description" as "description",
      "events"."thumb" as "thumb",
      "events"."transmissionMedium" as "transmissionMedium",
      "events"."accessibilityBonus" as "accessibilityBonus",
      "events"."date" as "date",
      json_agg("themes") as "theme"
    FROM events
    LEFT JOIN themes 
    ON  "events"."themeId" = "themes"."id"
    WHERE "events"."id" = $1
    group by "events"."id"
    `,
      [id],
    );

    if (event.length === 0) {
      return undefined;
    }

    return event;
  }

  public async findByTheme(theme: string[]): Promise<Event[]> {
    if (theme.length === 0) {
      const event = await this.ormRepository.query(
        `
      SELECT 
      "events"."id" as "id",
        "events"."name" as "name",
        "events"."description" as "description",
        "events"."thumb" as "thumb",
        "events"."transmissionMedium" as "transmissionMedium",
        "events"."accessibilityBonus" as "accessibilityBonus",
        "events"."date" as "date",
        json_agg("themes") as "theme"
      FROM events
      LEFT JOIN themes 
      ON  "events"."themeId" = "themes"."id"
      WHERE "themes"."name" = $1
      group by "events"."id"
      `,
        [theme[0]],
      );

      return event;
    }
    let queryLine = `WHERE "themes"."name" = $1 `;

    for (let i = 1; i < theme.length; i += 1) {
      queryLine += ` OR "themes"."name" = $${i + 1}`;
    }

    const event = await this.ormRepository.query(
      `
      SELECT 
      "events"."id" as "id",
        "events"."name" as "name",
        "events"."description" as "description",
        "events"."thumb" as "thumb",
        "events"."transmissionMedium" as "transmissionMedium",
        "events"."accessibilityBonus" as "accessibilityBonus",
        "events"."date" as "date",
        json_agg("themes") as "theme"
      FROM events
      LEFT JOIN themes 
      ON  "events"."themeId" = "themes"."id"
      ${queryLine}
      group by "events"."id"
      `,
      theme,
    );

    return event;
  }

  public async findByName(name: string): Promise<Event[]> {
    const nameCaptalized = name[0].toUpperCase() + name.substr(1).toLowerCase();

    const events = await this.ormRepository.query(
      `
    SELECT 
	  "events"."id" as "id",
      "events"."name" as "name",
      "events"."description" as "description",
      "events"."thumb" as "thumb",
      "events"."transmissionMedium" as "transmissionMedium",
      "events"."accessibilityBonus" as "accessibilityBonus",
      "events"."date" as "date",
      json_agg("themes") as "theme"
    FROM events
    LEFT JOIN themes 
    ON  "events"."themeId" = "themes"."id"
    WHERE "events"."name" LIKE '%${nameCaptalized}%' OR "events"."name" LIKE '%${name}%'
    group by "events"."id"
    `,
    );

    return events;
  }
}
