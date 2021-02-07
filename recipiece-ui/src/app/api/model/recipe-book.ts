import {Model} from './model';

export interface IRecipeBook extends Model {
  _id: string;
  name: string;
  description: string;
  recipes: string[];
}
