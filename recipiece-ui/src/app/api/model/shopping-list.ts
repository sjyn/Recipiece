import {Model} from './model';

export interface IShoppingListItem {
  id: string;
  name: string;
  notes: string;
  category: string;
  ordinal: number;
  completed: boolean;
}

export interface IShoppingList extends Model {
  _id?: string;
  name: string;
  items: IShoppingListItem[];
}
