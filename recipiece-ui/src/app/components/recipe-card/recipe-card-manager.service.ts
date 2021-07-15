import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {IShoppingList} from '../../api/model/shopping-list';
import {ShoppingListService} from '../../api/shopping-list.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeCardManagerService {
  public $shoppingLists: Subject<IShoppingList[]>;

  constructor(
    private shoppingListApi: ShoppingListService,
  ) {
    this.$shoppingLists = new ReplaySubject();
  }

  public saveList(list: IShoppingList): Observable<Partial<IShoppingList>> {
    return this.shoppingListApi.save(list);
  }
}
