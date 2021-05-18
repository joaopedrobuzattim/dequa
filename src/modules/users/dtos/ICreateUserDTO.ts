export default interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
  cpf: string;
  disability: string;
}
