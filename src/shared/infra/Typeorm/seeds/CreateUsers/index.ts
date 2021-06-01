// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '@modules/users/infra/Typeorm/entities/User';
import Disability from '@modules/disabilities/infra/Typeorm/entities/Disability';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Disability)
      .values([
        {
          id: '65c27c60-ac3d-490f-9b9c-de1e1c24dc5e',
          name: 'Surdez',
        },
        {
          id: '128e0d76-f77c-4534-882b-86c96f5ff17e',
          name: 'Mudez',
        },
        {
          id: '2aa71cc5-a766-494d-b604-d5975ed9df6c',
          name: 'Surdez e Mudez',
        },
      ])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: '2e76cc14-28e8-4bb2-a699-2c77b4d30401',
          name: 'Admin User',
          cpf: '98306510020',
          email: 'admin@admin.com',
          role: 'admin',
          birthDate: '01/08/1990',
          password: '$2y$08$GWkejT7T8LmMA3Uab2sv4epI3Bb7Ft5qtlq468CHAIqE5UJrQCKlu',
        },
      ])
      .execute();
  }
}
