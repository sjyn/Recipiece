import {Model} from './model';

export interface IRecipe extends Model {
  _id: string;
  name: string;
  description: string;
  private: number;
  steps: IRecipeStep[];
  ingredients: IRecipeIngredient[];
  links?: IRecipe[];
  owner: string;
}

type StepLenUnit = 'm' | 'h' | 'd' | 'w';

export interface IRecipeStep {
  content: string;
  length: {
    time: number;
    unit: StepLenUnit;
  };
}

export interface IRecipeIngredient {
  name: string;
  amount: string;
  unit?: string;
}
