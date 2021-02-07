import {Model} from './model';

export interface IUser extends Model {
  _id: string;
  email: string;
  password: string;
}
