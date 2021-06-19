import {Injectable} from '@angular/core';
import {SearchService} from './search-service';
import {IRecipe} from '../model/recipe';
import {RecipeService} from '../recipe.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeSearchService extends SearchService<IRecipe> {

  constructor(
    api: RecipeService,
  ) {
    super(api);
  }

  protected generateQuery(searchTerm: string): HttpParams {
    return new HttpParams().append('name', searchTerm);
  }

}
