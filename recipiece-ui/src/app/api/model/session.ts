import {Model} from './model';

export interface ISession extends Model {
  token: string;
  id: number;
}
