import {Injectable} from '@angular/core';
import {IRecipeBook} from '../../api/model/recipe-book';
import {RecipeBookService} from '../../api/recipe-book.service';
import {switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {IRecipe} from '../../api/model/recipe';

@Injectable()
export class DashboardStateService {
  private _selectedBook: IRecipeBook | undefined;

  public get selectedBook(): IRecipeBook {
    return this._selectedBook;
  }

  public set selectedBook(book: IRecipeBook | undefined) {
    this._selectedBook = book;
    this.page = 0;
    if (!!this._selectedBook) {
      // load the recipes for this book
      this.loadPageForRecipeBook();
    } else {
      // load all the recipes for the current page
      this.loadAllRecipesPage();
    }
  }

  // the recipes to display
  public page: number;
  public recipes: IRecipe[];
  public loading: boolean;

  constructor(
    private recipeBookService: RecipeBookService,
    private recipeService: RecipeService,
  ) {
    this.page = 0;
  }

  public loadAllRecipesPage() {
    this.loading = true;
    this.recipeService.listForUser(this.page)
      .pipe(take(1))
      .subscribe((results: IRecipe[]) => {
        this.recipes = results;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  public loadPageForRecipeBook() {
    this.loading = true;
    this.recipeBookService.listRecipesForBook(this.selectedBook._id, this.page)
      .pipe(take(1))
      .subscribe((result: IRecipe[]) => {
        this.recipes = result;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  public deleteRecipe(recipe: IRecipe) {
    this.recipeService.delete(recipe._id)
      .pipe(
        take(1),
        switchMap(() => {
          return this.recipeService.listForUser(this.page);
        }),
      )
      .subscribe((recipes) => {
        this.recipes = recipes as IRecipe[];
      });
  }
}
