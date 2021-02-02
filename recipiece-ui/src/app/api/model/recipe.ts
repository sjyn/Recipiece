import {Model} from './model';

export interface IRecipe extends Model {
  id: number;
  name: string;
  description: string;
  private: number;
  steps: IRecipeStep[];
  ingredients: IRecipeIngredient[];
  links?: IRecipe[];
  owner: number;
}

export interface IRecipeStep {
  content: string;
  idx: number;
}

export interface IRecipeIngredient {
  name: string;
  amount: string;
  unit?: string;
  idx: number;
}
