import {Model} from './model';
import {IEquipment} from './equipment';

export interface IRecipe extends Model {
  _id?: string;
  name: string;
  description: string;
  private: boolean;
  steps: IRecipeStep[];
  ingredients: IRecipeIngredient[];
  equipment?: IEquipment[],
  links?: string[];
  owner?: string;
  advanced: IRecipeAdvancedOptions;
}

type StepLenUnit = 'm' | 'h' | 'd' | 'w';


export interface IRecipeAdvancedOptions {
  highAltitude?: boolean;
  altitude?: number;
}


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
