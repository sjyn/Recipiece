import {Model} from './model';

export interface IUser extends Model {
  id: number;
  email: string;
  password: string;
}
