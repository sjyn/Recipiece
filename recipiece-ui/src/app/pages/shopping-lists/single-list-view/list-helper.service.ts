import {Injectable} from '@angular/core';
import {IShoppingList, IShoppingListItem} from '../../../api/model/shopping-list';
import {v4 as uuidv4} from 'uuid';
import {Observable, Subject} from 'rxjs';
import {ShoppingListService} from '../../../api/shopping-list.service';
import {debounceTime, take, tap} from 'rxjs/operators';

@Injectable()
export class ListHelperService {
  public shoppingList: Partial<IShoppingList>;
  public $shoppingList: Subject<Partial<IShoppingList>>;
  public saveTimeout;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {
    this.$shoppingList = new Subject();
  }

  public addItem() {
    this.shoppingList.listItems.unshift({
      id: uuidv4(),
      name: '',
      notes: '',
      category: '',
      ordinal: this.shoppingList.listItems.length,
      completed: false,
    });
    this.maybeSave();
  }

  public removeAll() {
    this.shoppingList.listItems = [];
    this.maybeSave();
  }

  public removeAllDone() {
    this.shoppingList.listItems = this.shoppingList.listItems.filter((item) => !item.completed);
    this.maybeSave();
  }

  public setItems(items: IShoppingListItem[]) {
    this.shoppingList.listItems = items;
    this.maybeSave();
  }

  public canSave(): boolean {
    return (this.shoppingList.name || '').trim() !== '' &&
      this.shoppingList.listItems.find((item) => {
        return item.name.trim() === '';
      }) === undefined;
  }

  public save(): Observable<Partial<IShoppingList>> {
    return this.shoppingListService.save(this.shoppingList)
      .pipe(
        debounceTime(1000),
        tap((list) => {
          this.$shoppingList.next(list);
        }),
      );
  }

  public deleteList(): Observable<any> {
    return this.shoppingListService.delete(this.shoppingList._id);
  }

  public maybeSave() {
    if (!!this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    if (this.canSave()) {
      this.saveTimeout = setTimeout(() => {
        this.save()
          .pipe(take(1))
          .subscribe();
      }, 500);
    } else {
      this.$shoppingList.next(this.shoppingList);
    }
  }
}
