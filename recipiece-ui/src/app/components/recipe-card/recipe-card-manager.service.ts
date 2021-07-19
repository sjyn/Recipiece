import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {IShoppingList} from '../../api/model/shopping-list';
import {ShoppingListService} from '../../api/shopping-list.service';
import {IRecipeBook} from '../../api/model/recipe-book';
import {map} from 'rxjs/operators';
import {RecipeBookService} from '../../api/recipe-book.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeCardManagerService {
  public $shoppingLists: Subject<IShoppingList[]>;
  public $recipeBooks: Subject<IRecipeBook[]>;

  constructor(
    private shoppingListApi: ShoppingListService,
    private recipeBookApi: RecipeBookService,
  ) {
    this.$shoppingLists = new ReplaySubject();
    this.$recipeBooks = new ReplaySubject();
  }

  public saveList(list: IShoppingList): Observable<Partial<IShoppingList>> {
    return this.shoppingListApi.save(list);
  }

  public addRecipeToRecipeBook(book: IRecipeBook, recipeId: string): Observable<Partial<IRecipeBook>> {
    book.recipes.push(recipeId);
    return this.recipeBookApi.save(book);
  }

  public getFilteredRecipeBooks(recipeId: string): Observable<IRecipeBook[]> {
    return this.$recipeBooks
      .pipe(
        map((books: IRecipeBook[]) => {
          return books.filter((book) => !book.recipes.includes(recipeId));
        }),
      );
  }
}
