import Disability from '../infra/Typeorm/entities/Disability';

export default interface IDisabilitiesRepository {
  save(disability: Disability): Promise<Disability>;
  create(name: string): Promise<Disability>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Disability | undefined>;
}
