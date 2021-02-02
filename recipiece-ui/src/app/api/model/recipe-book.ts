import {Model} from './model';

export interface IRecipeBook extends Model {
  id: number;
  name: string;
  description: string;
  recipes: number[];
}
