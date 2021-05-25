import Disability from '../infra/Typeorm/entities/Disability';

export default interface IDisabilitiesRepository {
  findById(id: string): Promise<Disability | undefined>;
}
