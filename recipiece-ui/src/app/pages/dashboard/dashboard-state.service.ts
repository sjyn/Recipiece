import {Injectable} from '@angular/core';
import {IRecipeBook} from '../../api/model/recipe-book';
import {RecipeBookService} from '../../api/recipe-book.service';
import {switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {IRecipe} from '../../api/model/recipe';

@Injectable()
export class DashboardStateService {
  private _selectedBook: IRecipeBook | undefined;
  private _page: number;

  public get page(): number {
    return this._page
  }

  public set page(page: number) {
    this._page = page;
  }

  public get selectedBook(): IRecipeBook {
    return this._selectedBook;
  }

  public set selectedBook(book: IRecipeBook | undefined) {
    this._selectedBook = book;
    if (!!this._selectedBook) {
      // load the recipes for this book
      this.loadPageForRecipeBook();
    } else {
      // load all the recipes for the current page
      this.loadAllRecipesPage();
    }
  }

  // the recipes to display
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
    this.recipeService.list(this.page)
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
          return this.recipeService.list(this.page);
        }),
      )
      .subscribe((recipes) => {
        this.recipes = recipes as IRecipe[];
      });
  }

  public removeRecipeFromCurrentBook(recipe: IRecipe) {
    this.selectedBook.recipes = this.selectedBook.recipes.filter((r) => r !== recipe._id);
    this.recipeBookService.save(this.selectedBook)
      .pipe(take(1))
      .subscribe((savedBook: IRecipeBook) => {
        this.selectedBook = savedBook;
      });
  }
}
