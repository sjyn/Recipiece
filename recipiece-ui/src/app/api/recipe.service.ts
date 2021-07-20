import {Injectable} from '@angular/core';
import {IRecipe} from './model/recipe';
import {StorageService} from '../services/storage.service';
import {HttpClient} from '@angular/common/http';
import {CachedApiConnector} from './classes/cached-api-connector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class RecipeService extends CachedApiConnector<IRecipe> {
  constructor(
    client: HttpClient,
    storage: StorageService,
  ) {
    super(storage, client, 'recipes');
  }

  public parseFromUrl(recipeUrl: string): Observable<IRecipe> {
    const url = this.getFullUrl(`${this.baseUrl}/from-url`);
    const body = {
      url: recipeUrl,
    };
    return this.client.post(url, body, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          return response.data;
        }),
      );
  }
}
