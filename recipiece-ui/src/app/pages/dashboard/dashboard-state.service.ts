import {Injectable} from '@angular/core';
import {IRecipeBook} from '../../api/model/recipe-book';
import {RecipeBookService} from '../../api/recipe-book.service';
import {debounceTime, distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {RecipeService} from '../../api/recipe.service';
import {IRecipe} from '../../api/model/recipe';
import {Subject} from 'rxjs';
import {nou} from '../../classes/utils';

export interface RecipeSearchBundle {
  name?: string;
  tags?: string[];
}

@Injectable()
export class DashboardStateService {
  private _selectedBook: IRecipeBook | undefined;
  private _page: number;
  private $recipeSearchChanged: Subject<RecipeSearchBundle>;

  public get page(): number {
    return this._page;
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
  public recipes: Subject<IRecipe[]>;
  public loading: boolean;
  public filtering: boolean;
  public searchRecipeName: string;

  constructor(
    private recipeBookService: RecipeBookService,
    private recipeService: RecipeService,
  ) {
    this.page = 0;
    this.recipes = new Subject();

    this.$recipeSearchChanged = new Subject();
    this.$recipeSearchChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((updatedModel: RecipeSearchBundle) => {
        this.searchRecipeName = updatedModel.name;
        this.runSearch(updatedModel);
      });
  }

  public loadAllRecipesPage(query?: any) {
    this.loading = true;
    this.recipeService.list(this.page, query)
      .pipe(take(1))
      .subscribe((results: IRecipe[]) => {
        this.recipes.next(results);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  public loadPageForRecipeBook(query?: any) {
    this.loading = true;
    this.recipeBookService.listRecipesForBook(this.selectedBook._id, this.page)
      .pipe(take(1))
      .subscribe((result: IRecipe[]) => {
        this.recipes.next(result);
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
        this.recipes.next(recipes as IRecipe[]);
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

  public searchRecipeNameChanged(recipeName: string) {
    this.$recipeSearchChanged.next({
      name: recipeName,
    });
  }

  public searchRecipeParamsChanged(updatedParams: RecipeSearchBundle) {
    this.$recipeSearchChanged.next(updatedParams);
  }

  public clearSearch() {
    this.$recipeSearchChanged.next({});
    this.filtering = false;
  }

  private runSearch(query: RecipeSearchBundle) {
    const name = (query.name || '').trim();
    const tags = query.tags || [];

    if (name.length > 0 || tags.length > 0) {
      if (nou(this._selectedBook)) {
        this.loadAllRecipesPage(query);
      } else {
        this.loadPageForRecipeBook(query);
      }
      this.filtering = true;
    } else {
      // just send them back to normal
      this.selectedBook = this._selectedBook;
      this.filtering = false;
    }
  }
}
