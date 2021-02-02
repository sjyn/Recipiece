import { Injectable } from '@angular/core';
import {IRecipeBook} from '../../api/model/recipe-book';

@Injectable()
export class DashboardStateService {
  public selectedBook: IRecipeBook | undefined;

  constructor() { }
}
