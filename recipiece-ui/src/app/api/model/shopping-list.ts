import {Model} from './model';

export interface IShoppingListItem {
  id: string;
  name: string;
  notes: string;
  category: string;
  ordinal: number;
  completed: boolean;
  recipe?: string;
}

export interface IShoppingList extends Model {
  _id?: string;
  name: string;
  listItems: IShoppingListItem[];
}
