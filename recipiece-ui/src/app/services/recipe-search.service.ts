import {Injectable} from '@angular/core';
import {RecipeService} from '../api/recipe.service';
import {Subject} from 'rxjs';
import {IRecipe} from '../api/model/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeSearchService {
  public $searchResults: Subject<IRecipe[]>

  constructor(
    private recipeApi: RecipeService,
  ) {
    this.$searchResults = new Subject<IRecipe[]>();
  }

  public searchRecipes(page: number, name: string, query: any) {
    this.recipeApi.list(page, {
      name: name,
    })
  }
}
