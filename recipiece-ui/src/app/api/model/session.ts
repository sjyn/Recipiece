import {Model} from './model';

export interface ISession extends Model {
  token: string;
  _id: string;
}
